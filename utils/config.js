const dotenv = require('./dotenv')
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: Number(dotenv.PORT),
        dbHost: dotenv.DB_HOST,
        dbUser: dotenv.DB_USER,
        dbPass: dotenv.DB_PASSWORD,
        dbName: dotenv.DB_NAME
    },
    production: {}
};

module.exports = config[env];
