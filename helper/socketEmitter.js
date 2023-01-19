const EventEmitter = require('events');
var userSocketMap = new Map();
var restaurantSocketMap = new Map();
var socketMap = new Map();
var eventEmitter = new EventEmitter();
var updateUser = () => {}
var updateRestaurant = () => {}
exports.SocketHelper = (io) => {

  io.on("connection", (socket) => {
    socket.on("join_restaurant", (payload) => {
      restaurantSocketMap.set(socket.id, payload)
      socketMap.set(("restaurant_" + payload), socket.id)
    });
    socket.on("join_user", (payload) => {
      userSocketMap.set(socket.id, payload)
      socketMap.set(("user_" + payload), socket.id)
    });

    eventEmitter.removeAllListeners('update_user');
    eventEmitter.removeAllListeners('update_restaurant');

    updateUser = (user_id) => {
      let socketId = null;
      if (socketMap.has(("user_" + user_id)))
        socketId = socketMap.get(("user_" + user_id))
      if (socketId) {
        io.to(socketId).emit("refreshActiveOrder");
      }
    }
  
    updateRestaurant = (restaurant_id) => {
      let socketId = null;
      if (socketMap.has(("restaurant_" + restaurant_id)))
        socketId = socketMap.get(("restaurant_" + restaurant_id))
      if (socketId) {
        io.to(socketId).emit("refreshActiveOrder");
      }
    }

    eventEmitter.on('update_user', (user_id) => {
      if (user_id)
        updateUser(user_id)
    });
    eventEmitter.on('update_restaurant', (restaurant_id) => {
      if (restaurant_id)
        updateRestaurant(restaurant_id)
    });

    socket.on("disconnect", () => {
      if (restaurantSocketMap.has(socket.id)) {
        let restaurant_id = restaurantSocketMap.get(socket.id)
        restaurantSocketMap.delete(socket.id)
        socketMap.delete("restaurant_" + restaurant_id)
      }

      if (userSocketMap.has(socket.id)) {
        let user_id = userSocketMap.get(socket.id)
        userSocketMap.delete(socket.id)
        socketMap.delete("user_" + user_id)
      }
    });
  });
};

exports.refreshUser = (user_id) => {
  eventEmitter.emit('update_user', user_id);
}

exports.refreshRestaurant = (restaurant_id) => {
  eventEmitter.emit('update_restaurant', restaurant_id);
}

