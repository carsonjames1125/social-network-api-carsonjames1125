const { connect, connection } = require('mongoose');

//connecting to mongodb database
const connectionStr = 
process.env.MONGODB_URI || '';

connect(connectionStr, {
    useNewUrlParsers: true,
    useUnifiedTopology: true,
});

module.exports = connection;
