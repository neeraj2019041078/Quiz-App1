const mongoose=require('mongoose');

const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect("mongodb://localhost:27017/quiz",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`Mongo DB Connected`);
    }
    catch(err)
    {
        console.error(err);
        process.exit(1);
    }
}

module.exports=connectDB;