const mongoose = require('mongoose');
const {config} = require('../../../config/env');

const option = {
    keepAlive: true, 
    socketTimeoutMS: 172800000,
    connectTimeoutMS: 172800000 
};

mongoose.connect(config.db, option);

mongoose.connection.on('error', function(err) {
    if (err) {
        console.log('MongoDB failed!: ', err);
    }
});

mongoose.connection.on('open', function() {
    console.log('Connected to mongodb database');
}); 
  
mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});



module.exports = mongoose;
