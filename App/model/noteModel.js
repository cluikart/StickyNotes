
//   const sequelize = require("./dbConnect");

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
  class Note extends Model {}
  Note.init({
      note_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
      },
      user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      board_id: {
          type: Sequelize.STRING,
          allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: true
    },
    x: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    y: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    }
  }, {
      sequelize,
      modelName: 'note'
  });

  module.exports = Note;