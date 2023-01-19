const mongoose=require('mongoose');

const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect("mongodb+srv://neerajv21:Neeraj123@cluster0.mzzhghr.mongodb.net/quiz?retryWrites=true&w=majority",{
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