const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.p6zp8sc.mongodb.net/';

connect(connectionString);

module.exports = connection;