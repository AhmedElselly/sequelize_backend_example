const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('mysql://root:@localhost:3306/sql_testing');

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('connected to db');
    } catch (err) {
        console.log('can\'t connect to db!...');
    }
}

module.exports = {connectDb, sequelize};

// module.exports = connectDb;