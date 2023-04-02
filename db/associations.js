const Model = require("./model");


function DefineAssociation() {
  Model.Restaurant.belongsTo(Model.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  })
  Model.Address.belongsTo(Model.User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  })
  Model.User.belongsTo(Model.Restaurant, {
    foreignKey: 'restaurant_id',
    onDelete: 'SET NULL',
  })
  Model.MenuCategory.belongsTo(Model.Restaurant, {
    foreignKey: 'restaurant_id',
    onDelete: 'CASCADE',
  })
  Model.MenuItem.belongsTo(Model.MenuCategory, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    through: Model.Restaurant,
  })
  // Model.Plan.hasMany(Model.Restaurant,{
  //   foreignKey: 'plan_id',
  //   onDelete: 'SET NULL'
  // })
  Model.PersonDelivery.belongsTo(Model.Restaurant, {
    foreignKey: 'restaurant_id',
    onDelete: 'CASCADE',
  })
  Model.Orders.belongsTo(Model.Restaurant, {
    foreignKey: 'restaurant_id',
    onDelete: 'CASCADE',
  })
  Model.Orders.belongsTo(Model.User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
  })
  Model.Orders.belongsTo(Model.Transaction, {
    foreignKey: 'recipt_id',
    onDelete: 'SET NULL',
  })
  // Model.Orders.belongsTo(Model.OrderStatus, {
  //   foreignKey: 'orderStatus_Id',
  //   onDelete: 'SET NULL',
  // })
  // Model.Orders.belongsTo(Model.Address, {
  //   foreignKey: 'address_id',
  //   onDelete: 'SET NULL',
  // })
  // Model.Orders.belongsTo(Model.PersonDelivery, {
  //   foreignKey: 'address_id',
  //   onDelete: 'SET NULL',
  // })
  // Model.Orders.belongsTo(Model.Address, {
  //   foreignKey: 'address_id',
  //   onDelete: 'SET NULL',
  // })
}

module.exports = DefineAssociation;