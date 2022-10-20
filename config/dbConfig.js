module.exports = {
    HOST: 'localhost',
    USER: 'newuser',
    PASSWORD: 'newpassword',
    DB: 'nodemysql',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}