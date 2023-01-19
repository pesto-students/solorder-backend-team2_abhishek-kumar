require("dotenv").config();

const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const Sentry = require("@sentry/node");
require("@sentry/tracing");

const {sequelize} = require("./db")
const Model = require("./db/model");
const DefineAssociation = require("./db/associations");

const { errorHandler, sentryErrorHandler } = require("./util");
const allOtherRoutes = require("./routes");
const { SocketHelper } = require("./helper/socketEmitter");

Sentry.init({
  dsn: process.env.SENTRY_DNS,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Test Routes
app.get("/test", (req, res) => {
  res.send("Solorder Server is up!!");
});

app.get("/sentrytest", (req, res) => {
  throw new Error("Sentry test call");
});

// Other Routes
app.use("/", allOtherRoutes);

// Handle unknown defined path.
app.use("*", (req, res) => {
  let { method, baseUrl } = req
  throw { error: true, msg: `{${method}} ${baseUrl} not found.`, status: 404 }
})

//error handelling middleware
app.use(errorHandler);

//error reporting to sentry
app.use(sentryErrorHandler);

// Port number
const PORT = process.env.PORT || 5000;

// Stop Server if DB connect fail.
process.on("STOP", function(){
  console.log("Something went wrong! Server stoped");
  server.close();
})

// Server running check
server.listen(PORT, async () => {
  try {
    DefineAssociation()
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
    // await sequelize.authenticate();
    // Socket implementation
    SocketHelper(io);
    console.log("=========================================");
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log("=========================================");
    console.log('DB connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
    // Stop Server Event.
    process.send("STOP");
  }
});
