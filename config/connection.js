const { connect, connection } = require('mongoose');

//connecting to mongodb database
const connectionStr = 
process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectionStr, {
    useNewUrlParsers: true,
    useUnifiedTopology: true,
});

module.exports = connection;
