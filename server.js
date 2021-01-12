const express = require('express');
const User = require("./models/mongodb");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
var alert=false;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    const userRecords=await User.find();
    // console.log(data);
    res.render('index',{alert: false, records: userRecords});
})
app.get('/addDetails', (req, res) => {
    res.render('addDetails',{alert: false,title: "Add New User",record:{}});
})

app.get('/updateDetails/:id',(req,res) => {
    var id = req.params.id
    var title;
    User.findById(id,(err,data) => {
        // console.log(data)
        if (err) throw err;
        res.render("updateDetails",{title:"Update User", record: data, alert: false });
    })  
})

// app.post("/", (req, res) => {

//     addUser(req, res);

// });


// function addUser(req, res) {
//     var name = req.body.name;
//     var email = req.body.email;
//     var mobile = req.body.mobile;
//     var college = req.body.college;
//     var branch = req.body.branch;

//     var user = new model({
//         name: name,
//         email: email,
//         mobile: mobile,
//         college: college,
//         branch: branch
//     });

//     user.save(function (err, doc) {
//         if (err) throw err;
//         console.log("Data Saved");
//         data.exec(function (err, data) {
//             if (err){throw err};   
//             res.render("index");
//         });
//     });
// }

app.post("/", async (req, res) => {
  
        const userRecords=await User.find();
        try {
        //   res.send(req.body);
        const userData = new User(req.body);
           await userData.save();
          
           res.status(201).render("addDetails",{alert: true,record: userRecords,title: "Add New User"});
        } catch (error) {
            console.log(error);
            res.status(500).render('index',{alert: false,records: userRecords});
        }
    
});
app.post("/updateDetails/:id", async (req, res) => {
  console.log('user updating')
    const id=req.params.id;
    try{
        const record = await User.findByIdAndUpdate(id, req.body) 
        res.status(201).render("updateDetails",{alert: true,record: {},title: "Update User"});
    }catch(e){
        console.log('some error occured'+ e);
    }  
});

app.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

app.listen(3000, () => {
    console.log('server is listening on PORT 3000');
})