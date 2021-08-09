const config = require('./env.js');

//sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    },
);

//db to use sequelize
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//require models
db.tutorials = require('../models/tutorial.model')(sequelize, Sequelize);
db.comments = require('../models/comment.model')(sequelize, Sequelize);
//relationships
//one to many
db.tutorials.hasMany(db.comments, {as: "comments"});
db.comments.belongsTo(db.tutorials, {
    foreignKey: "tutorialId",
    as: "tutorial"
});

module.exports = db;