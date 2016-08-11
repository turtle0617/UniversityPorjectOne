var express = require('express'),
    router = express.Router(),
    request = require('request'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cheerio = require('cheerio'),
    firebase = require("firebase");

//連結Firebase
firebase.initializeApp({
    apiKey: 'LWVoFoYKRw9FR97i7iYHJ6BOQEeG5hik1mNon7sD',
    databaseURL: 'https://allpaydata.firebaseio.com'
});

var rURL = "http://putsreq.com/7iHInelQUtbQIDI1B8F0";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/', function(req, res) {
    res.sendFile(path.resolve('view/index.html'));
});

router.post('/send', function(req, res, next) {
    console.log(req.body);
    var ItemName = "";
    var ItemName1 = req.body.bag1,
        ItemName2 = req.body.bag2,
        ItemName3 = req.body.bag3;
    if (ItemName1 == 0 && ItemName2 == 0) {
        ItemName += "小丑女零錢包" + ItemName3 + "個";
    } else if (ItemName1 == 0 && ItemName3 == 0) {
        ItemName += "柴犬零錢包" + ItemName2 + "個";
    } else if (ItemName2 == 0 && ItemName3 == 0) {
        ItemName += "柯基零錢包" + ItemName1 + "個";
    } else {
        ItemName += "柯基零錢包" + ItemName1 + "個," + "柴犬零錢包" + ItemName2 + "個," + "小丑女零錢包" + ItemName3 + "個";
    }

    var date = new Date();
    var Month = date.getMonth(),
        Day = date.getDay(),
        Hours = date.getHours(),
        Minutes = date.getMinutes(),
        Seconds = date.getSeconds();
    var time = date.getFullYear() + '/' + (Month < 10 ? '0' : '') + Month + '/' + (Day < 10 ? '0' : '') + Day + ' ' + (Hours < 10 ? '0' : '') + Hours + ':' + (Minutes < 10 ? '0' : '') + Minutes + ':' + (Seconds < 10 ? '0' : '') + Seconds;
    var time1 = date.getFullYear() + (Month < 10 ? '0' : '') + Month + (Day < 10 ? '0' : '') + Day + (Hours < 10 ? '0' : '') + Hours + (Minutes < 10 ? '0' : '') + Minutes + (Seconds < 10 ? '0' : '') + Seconds;
    var TradeNo = 'coin' + time1;
    console.log(ItemName);
    var form1 = {
            MerchantID: 2000132, //廠商編號(由allpay 提供)
            MerchantTradeNo: TradeNo, //廠商交易編號(由商家自訂)
            MerchantTradeDate: time, //廠商交易時間
            PaymentType: 'aio', //交易類型
            TotalAmount: req.body.TotalAmount, //交易金額
            TradeDesc: 'allpay 商城購物-', //交易描述
            ItemName:  ItemName, //商品名稱
            ReturnURL: rURL, //回傳網址
            ChoosePayment: req.body.ChoosePayment //付款方式
        }
        firebase.database().ref('/allpaydata').push({
            Name: req.body.Name,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Place: req.body.Place,
            MerchantTradeNo: TradeNo
        });
    request.post({
        url: 'https://payment-stage.allpay.com.tw/AioHelper/GenCheckMacValue',
        form: form1
    }, function(err, httpResponse, body) {
        // console.log(body);
        var form2 = {
                MerchantID: 2000132,
                MerchantTradeNo: TradeNo,
                MerchantTradeDate: time,
                PaymentType: 'aio',
                TotalAmount: req.body.TotalAmount,
                TradeDesc: 'allpay 商城購物-',
                ItemName: ItemName,
                ReturnURL: rURL,
                ChoosePayment: req.body.ChoosePayment,
                CheckMacValue: body
            }
            // console.log(form2);
        request.post({
            url: 'https://payment-stage.allpay.com.tw/Cashier/AioCheckOut/V2',
            form: form2
        }, function(err, httpResponse, body) {
            $ = cheerio.load(body);
            $("head").prepend('<base href="https://payment-stage.allpay.com.tw" target="_blank"/>');
            res.send($.html());
        });
    });
});



module.exports = router