const mongoose = require("mongoose");

const mongoPath = `mongodb+srv://users:mohit1211@cluster0.337i1.mongodb.net/users?retryWrites=true&w=majority`;
//creating a database
 mongoose.connect(mongoPath,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useFindAndModify: true
}).then(()=>{
    console.log(`connection successful`);
}).catch((error)=>{
    console.log(error);
});

const uploadSchema=new mongoose.Schema({
    name: String,
    mobile: String,
    email:String,
    college: String,
    branch: String
})

const uploadModel=mongoose.model('user',uploadSchema);

module.exports=uploadModel;