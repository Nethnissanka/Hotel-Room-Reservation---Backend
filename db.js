const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb+srv://nethnissanka2000:Holy25girl@cluster0.3y2x63w.mongodb.net/mern-rooms',
            
        );
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;






// //db.js
// const mongoose = require("mongoose");

// var mongoURL = 'mongodb+srv://nethminimasha03:Millennial@4@cluster0.yayl7sm.mongodb.net/';

// mongoose.connect(mongoURL, {useUnifiedTopology: true , useNewUrlParser: true });

// var connection = mongoose.connection;

// connection.on('error' , ()=>{
//      console.log('Connection failed')
// })

// connection.on('connected' , ()=>{
//      console.log('Connected to MongoDB')
// })


// module.exports = mongoose;