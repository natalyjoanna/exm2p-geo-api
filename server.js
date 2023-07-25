const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Branch = require('./api/branches');
const cors = require('cors');

const app = express();

var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./sslcerts/selfsigned.pkey', 'utf8');
var certificate = fs.readFileSync('./sslcerts/selfsigned.cer', 'utf8');
var credentials = {key: privateKey, cert: certificate};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/api/branches', Branch);

var httpsServer = https.createServer(credentials, app);


  mongoose.connect(
    "mongodb://127.0.0.1/branches",
    { useNewUrlParser: true }
).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
            /* app.listen(4001, ()=>{
                console.log('Server running on http://192.168.100.10:4001');
            });
            httpsServer.listen(5176, ()=>{
              console.log('Server running on https://192.168.100.10:5176');
            }); */
             app.listen(4001, ()=>{
              console.log('Server running on http://172.18.70.37:4001');
          });
          httpsServer.listen(5176, ()=>{
            console.log('Server running on https://172.18.70.37:5176');
          }); 
    },
    err => { /** handle initial connection error */ 
            err & console.log(err) & console.log('Error connecting to db');
    }
  );