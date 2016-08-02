var request = require('request'),
    bodyParser = require('body-parser');

var url = 'https://payment-stage.allpay.com.tw/AioHelper/GenCheckMacValue';

function firstPost(callback){
	request.post({
		url : url,
		form: req.body
	},function(err,respone,body){
		callback(body);
	});
}

module.exports = firstPost;