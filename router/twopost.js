var request = require('request');
var url = 'https://payment-stage.allpay.com.tw/AioHelper/GenCheckMacValue';

function twoPost(data,callback){
	request.post({
		url : url,
		form: {
			MerchantID: req.body.MerchantID,
            MerchantTradeNo: req.body.MerchantTradeNo,
            MerchantTradeDate: req.body.MerchantTradeDate,
            PaymentType: req.body.PaymentType,
            TotalAmount: req.body.TotalAmount,
            TradeDesc: req.body.TradeDesc,
            ItemName: req.body.ItemName,
            ReturnURL: req.body.ReturnURL,
            ChoosePayment: req.body.ChoosePayment,
            CheckMacValue: body,
		}
	},function(err,respone,body){
		res.send(form);
	});
}

module.exports = twoPost;