/* CURRENCY EXCHANGE API CALL */

// necessary variables for API call
convertBtn.addEventListener('click', (event)=> {
  event.preventDefault()
  const form = document.getElementById('form');
  const convertBtn = document.getElementById('convertBtn');
  var input = document.getElementById('input');
  var currencyTo = document.getElementById('currencyTo').value;
var currencyFrom = document.getElementById('currencyFrom').value;
    
     
      var amount = (input.value);
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
getCurrency() 

    }
  
  )
