/* CURRENCY EXCHANGE API CALL */

// necessary variables for API call
var currencyTo = "";
var currencyFrom = "";
var amount = 0;


var requestURL = `https://api.apilayer.com/fixer/convert?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`;

var myHeaders = new Headers();
myHeaders.append("apikey", "YJtlkQDlPUG4dvDBd01umEs1dtIkBCan");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

var getCurrency = function(){
    fetch(requestURL, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

getCurrency();