var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

app.use("/image", express.static(__dirname + '/image'));

app.use("/js", express.static(__dirname + '/js'));


app.use("/style", express.static(__dirname + '/style'));

app.use(require('./router/index'));

app.listen(3000,function(){
	console.log('allpaytest work on 3000 port');
});



