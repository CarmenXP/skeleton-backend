require('dotenv').config()

const config = {
    PORT: process.env.PORT || 9000,
    nodeEnv: process.env.NODE_ENV || 'development',  //Desarrollo, Testing, Producción
    db: {
        host: process.env.HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '24061987',
        dbName: process.env.DB_NAME
    }
}

module.exports = config