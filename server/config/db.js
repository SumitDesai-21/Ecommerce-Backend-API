import mongoose from 'mongoose'
// mongoos ODM (object data modelling)
// connecting mongoDB with backend

// create connectDB
const connectDB = async() =>{
    try{
        // connet mongoDB
        mongoose.connection.on('connected', ()=>{
            console.log('Database Connected.');  
        });
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    }   
    catch(error){
        console.log('Failed to connect MongoDB Server.', error);
    }
}

export default connectDB;
