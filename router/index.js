var express = require('express'),
    router = express.Router(),
    request = require('request'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cheerio = require('cheerio');

// var firstPost = require('./firstPost.js'),
//     twoPost = require('./twoPost.js');

var rURL = "http://putsreq.com/7iHInelQUtbQIDI1B8F0";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/', function(req, res) {
    res.sendFile(path.resolve('view/test.html'));
});

// router.post('/send', function(req, res, next) {
//     var date = new Date();
//     var Month = date.getMonth(),
//         Day = date.getDay(),
//         Hours = date.getHours(),
//         Minutes = date.getMinutes(),
//         Seconds = date.getSeconds();
//     var time = date.getFullYear()+'/'+(Month<10 ? '0' : '')+Month+'/'+(Day<10 ? '0' : '')+Day+' '+(Hours<10 ? '0' : '')+Hours+':'+(Minutes<10 ? '0' : '')+Minutes+':'+(Seconds<10 ? '0' : '')+Seconds;
//     var form1 = {
//             MerchantID: , //廠商編號(由allpay 提供)
//             MerchantTradeNo: req.body.MerchantTradeNo, //廠商交易編號(由商家自訂)
//             MerchantTradeDate: time, //廠商交易時間
//             PaymentType: 'aio', //交易類型
//             TotalAmount: req.body.TotalAmount, //交易金額
//             TradeDesc: '歐付寶', //交易描述
//             ItemName: '測試用30元', //商品名稱
//             ReturnURL: rURL, //回傳網址
//             ChoosePayment: req.body.ChoosePayment //付款方式
//         }
//         console.log(form1);
//     request.post({
//         url: 'https://payment.allpay.com.tw/AioHelper/GenCheckMacValue',
//         form: form1
//     }, function(err, httpResponse, body) {
//         console.log(body);
//         var form2 = {
//             MerchantID: ,
//             MerchantTradeNo: req.body.MerchantTradeNo,
//             MerchantTradeDate: time,
//             PaymentType: 'aio',
//             TotalAmount: req.body.TotalAmount,
//             TradeDesc: '歐付寶',
//             ItemName: '測試用30元 X1',
//             ReturnURL: rURL,
//             ChoosePayment: req.body.ChoosePayment,
//             CheckMacValue: body
//         }
//         console.log(form2);
//         request.post({
//             url: 'https://payment.allpay.com.tw/Cashier/AioCheckOut/V2',
//             form: form2
//         }, function(err, httpResponse, body) {
//             $ = cheerio.load(body);
//             $("head").prepend('<base href="https://payment-stage.allpay.com.tw" target="_blank"/>');
//             res.send($.html());
//         });
//     });
// });

router.post('/send', function(req, res, next) {
    var date = new Date();
    var Month = date.getMonth(),
        Day = date.getDay(),
        Hours = date.getHours(),
        Minutes = date.getMinutes(),
        Seconds = date.getSeconds();
    var time = date.getFullYear()+'/'+(Month<10 ? '0' : '')+Month+'/'+(Day<10 ? '0' : '')+Day+' '+(Hours<10 ? '0' : '')+Hours+':'+(Minutes<10 ? '0' : '')+Minutes+':'+(Seconds<10 ? '0' : '')+Seconds;
    var form1 = {
            MerchantID: 2000132, //廠商編號(由allpay 提供)
            MerchantTradeNo: req.body.MerchantTradeNo, //廠商交易編號(由商家自訂)
            MerchantTradeDate: time, //廠商交易時間
            PaymentType: 'aio', //交易類型
            TotalAmount: req.body.TotalAmount, //交易金額
            TradeDesc: 'allpay 商城購物-', //交易描述
            ItemName: '測試用30元 X1', //商品名稱
            ReturnURL: rURL, //回傳網址
            ChoosePayment: req.body.ChoosePayment //付款方式
        }
        console.log(form1);
    request.post({
        url: 'https://payment-stage.allpay.com.tw/AioHelper/GenCheckMacValue',
        form: form1
    }, function(err, httpResponse, body) {
        console.log(body);
        var form2 = {
            MerchantID: 2000132,
            MerchantTradeNo: req.body.MerchantTradeNo,
            MerchantTradeDate: time,
            PaymentType: 'aio',
            TotalAmount: req.body.TotalAmount,
            TradeDesc: 'allpay 商城購物-',
            ItemName: '測試用30元 X1',
            ReturnURL: rURL,
            ChoosePayment: req.body.ChoosePayment,
            CheckMacValue: body
        }
        console.log(form2);
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



// router.post('/send', function(req, res, next) {
//     //先取得檢查碼
//     var date = new Date();
//     var time = date.getFullYear()+'/'+date.getMonth()+'/'+date.getDay()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
//     var form1 = {
//             MerchantID: req.body.MerchantID,
//             MerchantTradeNo: req.body.MerchantTradeNo,
//             MerchantTradeDate: req.body.MerchantTradeDate,
//             PaymentType: 'aio',
//             TotalAmount: req.body.TotalAmount,
//             TradeDesc: req.body.TradeDesc,
//             ItemName: req.body.ItemName,
//             ReturnURL: req.body.ReturnURL,
//             ChoosePayment: req.body.ChoosePayment
//         };
//     console.log(form1);
//     request.post({
//         url: 'https://payment-stage.allpay.com.tw/AioHelper/GenCheckMacValue',
//         form: form1
//     }, function(err, httpResponse, body) {
//         //從歐付寶取得檢查碼後，組合成一個form
//         console.log(body);
//         var form = `
//         傳送中...
//         <form id="form" method="post" action="https://payment-stage.allpay.com.tw/Cashier/AioCheckOut/V2">
//             <input type="hidden" name="MerchantID" value="${req.body.MerchantID}">
//             <input type="hidden" name="MerchantTradeNo" value="${req.body.MerchantTradeNo}">
//             <input type="hidden" name="MerchantTradeDate" value="${req.body.MerchantTradeDate}">
//             <input type="hidden" name="PaymentType" value="${form1.PaymentType}">
//             <input type="hidden" name="TotalAmount" value="${req.body.TotalAmount}">
//             <input type="hidden" name="TradeDesc" value="${req.body.TradeDesc}">
//             <input type="hidden" name="ItemName" value="${req.body.ItemName}">
//             <input type="hidden" name="ReturnURL" value="${req.body.ReturnURL}">
//             <input type="hidden" name="ChoosePayment" value="${req.body.ChoosePayment}">
//             <input type="hidden" name="CheckMacValue" value="${body}">
//         </form>
//          <script>
//              document.getElementById('form').submit();
//          </script>
//         `;
//         //加入自動送出的script後，回傳給前端
//         res.send(form);
//         console.log(form);
//     });
// });



module.exports = router