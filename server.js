require("dotenv").config();

const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const Sentry = require("@sentry/node");
require("@sentry/tracing");

const { errorHandler,sentryErrorHandler } = require("./util");
const {pool,client} = require("./db")

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");

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

// Routes
app.get("/", (req, res) => {
  res.send("Expense Server is up!!");
});

app.get("/sentrytest", (req, res) => {
  throw new Error("Sentry test call");
});


app.get("/api", async (req, res, next) => {
  try {
    let result = await pool.query('SELECT * FROM demotable')
    res.json({
      data: result.rows
    })
  } catch (error) {
    next(error)
  }
});
// app.post("/weather/city", ...weatherCity);

app.use("/api", authRoutes);
app.use("/api", expenseRoutes);
// app.use("/api", userRoutes);

//error handelling middleware
app.use(errorHandler);

//error reporting to sentry
app.use(sentryErrorHandler);

// Port number
const PORT = process.env.PORT || 5000;

// Server running check
app.listen(PORT, () => {
  console.log("=========================================");
  console.log(`Server listening at http://localhost:${PORT}`);
});
