module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "kutnpvrhom7lki7u.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      user: "wqg5mtd9x1gcuaue",
      password: "i649sqoqlv7trx4i",
      database: "bfu671gx9kxkcdsd",
      port: 3306,
      charset: "utf8"
    },
    production: {
      client: 'mysql',
      connection: process.env.JAWSDB_URL,
    },
  },
};
