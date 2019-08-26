const Sequelize = require("sequelize");

const sequelize = new Sequelize('noteAppdb', 'cluikart', '1Magnetism', {
    host: 'stickynoteswebapp.cudm5mtmqajw.us-east-2.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        timestamps: false,
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Model = Sequelize.Model;
  class User extends Model {}
  User.init({
      user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
      },
      username: {
          type: Sequelize.STRING,
          allowNull: false
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
    }
  }, {
      sequelize,
      modelName: 'user'
  });

  module.exports = User;