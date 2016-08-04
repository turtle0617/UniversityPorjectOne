var array ="TradeDesc=促銷方案&PaymentType=aio&MerchantTradeDate=2013/03/12 15:30:23&MerchantTradeNo=allpay20130312153023&MerchantID=2000132&ReturnURL=https://www.allpay.com.tw/receive.php&ItemName=Apple iphone 7 手機殼&TotalAmount=1000&ChoosePayment=ALL&EncryptType=0";
const crypto = require('crypto');

function test(array){
	// var a = JSON.stringify(obj);
	var data = array.split('&').sort().join('&');
	var hashkey = 'HashKey=' + '5294y06JbISpM5x9' + '&';
    var hashiv = '&HashIV=' + 'v77hoKGq4kWxNNIS';
    var queryString = hashkey + data + hashiv;
    var encode = encodeURIComponent(queryString).toLowerCase();

    var allpayencode = encode.replace(/%20/g,'+')
	var fin = crypto.createHash('md5').update(data).digest("hex");
    console.log(fin);

}
// console.log(obj[1]);
test(array);
