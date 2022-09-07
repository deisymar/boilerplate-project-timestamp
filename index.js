// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/**resObj default is error*/
let resObj = {error: "Invalid Date"};
app.get('/api/:date_string', (req, res) =>{
  let date, 
      dateParam = req.params.date_string;  
  //console.log(dateParam); 
  //test dateParam
  if(typeof dateParam == 'string') {
    if(+dateParam == dateParam) {
     date= new Date(+dateParam); 
    }
    else {
      date = new Date(dateParam);
    }
    if(!isNaN(date)) {
      resObj['unix'] = date.getTime();
      resObj['utc'] = date.toUTCString();
    }
  }
    
  res.json(resObj)
});

app.get('/api', (req, res) => {
  resObj['unix'] = new Date().getTime();
  resObj['utc'] = new Date().toUTCString();
  res.json(resObj)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

