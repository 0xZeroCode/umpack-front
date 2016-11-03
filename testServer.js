var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(express.static('./'));

app.use(function(req, res, next) {
	console.log(req.body);
    res.redirect('/');
});

app.listen(3000, function() {
    console.log('start listening');
})
