const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
var bodyParser = require('body-parser');    //not used now
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance')
.then(() => {
    console.log("we are connected");
}).catch(() => {
    console.log("we are not connected");
})
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
// app.get('/', (req, res)=>{
//     const params = {}
//     res.status(200).render('index.pug', params);
// })
// now base page is home not index
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});
// for /contact end point
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save()
        .then(() => res.send("This item has been saved to the database"))
        .catch(() => res.status(400).send("Item was not saved to the database"));
    // res.status(200).render('contact.pug');
})
// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
