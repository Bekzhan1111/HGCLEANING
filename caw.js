const  express= require('express')
const bodyparser= require('body-parser')
const https=require('https')
const {response} = require("express");
const app=express()
// const port = 3000


const bodyParser=require("body-parser");
const ejs=require("ejs");
const UserRoute = require('./routes/User.js');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const router = express.Router();



app.set('view engine', 'ejs')
app.use(express.static('/'))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/js',express.static(__dirname+'/js'))
app.use('/img',express.static(__dirname+'/img'))
app.use('/css',express.static(__dirname+'/css'))

app.use('/about', require('./routes/about.js'))
app.use('/contact', require('./routes/contact.js'))
app.use('/', require('./routes/index.js'))
app.use('/portfolio', require('./routes/portfolio.js'))
app.use('/service', require('./routes/service.js'))
app.use('/single', require('./routes/single.js'))
app.use('/weather', require('./routes/weather.js'))


app.get('/', (req, res) => {
    res.sendFile(__dirname+'/views/index.ejs')
})
// app.post('/',((req, res) =>{
//     let cityname=req.body.city
//     let key="d134b1b82bb2a01099550a3393edb5"
//     let url="https://api.openweathermap.org/data/2.5/weather?q=" +cityname + "&appid=" + key + "&units=metric&mode=json"
//     https.get(url,function (response){
//         response.on( 'data',data=>{
//             // console.log(data)
//             let a= JSON.parse(data)
//             let temp= a.main.temp
//             let cond= a.weather[0].description
//             res.send("Weather in city:"+ cityname + "  "+cond+"  "+temp)
//         })
//
//     })
//
// } ))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});




mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.use('/user', UserRoute)


const UserModel = require('./models/user')

app.post('/',function (req ,res){
    let newUser=new UserModel({
        yourName: req.body.yourName,
        number:req.body.number,
        comment:req.body.comment,
        service:req.body.service,
        // TableType:req.body.TableType,
        // Placement:req.body.Placement,
        // Date:req.body.Date,
        // time:req.body.Time,
        // Note:req.body.Note,
    })
    newUser.save();
    res.redirect("/")
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

})



