require('dotenv').config();
var express=require('express')
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser');

/*********CONTROLLERS******* */
let user = require('./controllers/usercontroller')
let login = require('./controllers/logincontroller')
let power = require('./controllers/powercontroller')


sequelize.sync(); 

app.use(bodyParser.json());

app.use(require('./middleware/headers'))

/****EXPOSED****/
app.use('/api/user', user);  // creates a user 
app.use('/api/login', login);  // allows an already existing user to login
app.use('/api/power', power);

/****MIDDLEWARE****/
app.use(require('./middleware/validate-session'))

/****PROTECTED ROUTES****/




app.listen(process.env.PORT, function() {
    console.log('app is on 3002')
});