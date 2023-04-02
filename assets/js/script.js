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
    getCurrency();
   })


/* GENERATE MAP DIV */
var map;
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

/* MODALS FOR MARKERS */
// open modal
var modalTitle = document.getElementById('modal-title');
var modalBody = document.getElementById('modal-body');
var modal = document.getElementById('modal');
var showModal = function(event){
  var clickedMarkerData = bankData.get(event.target); 
  modalTitle.textContent = clickedMarkerData.name
  modalBody.innerHTML = '';
  if(clickedMarkerData.address != undefined && clickedMarkerData.address != null){
    var addressElement = document.createElement("div");
    addressElement.textContent = "Address: " + clickedMarkerData.address;
    modalBody.prepend(addressElement);
    var directionsButton = document.createElement("a");
    directionsButton.setAttribute("href", `https://maps.google.com/?q=${clickedMarkerData.address}`);
    directionsButton.setAttribute("target", "_blank");
    directionsButton.textContent = "GOOGLE MAPS";
    modalBody.append(directionsButton);
  }
  if(clickedMarkerData.phone != undefined && clickedMarkerData.phone != null){
    var phoneElement = document.createElement("a");
    phoneElement.setAttribute("href", "tel:" + clickedMarkerData.phone);
    phoneElement.setAttribute("target", "_blank");
    phoneElement.textContent = "Phone: " + clickedMarkerData.phone;
    modalBody.prepend(phoneElement);
  }
  if(clickedMarkerData.url != undefined && clickedMarkerData.url != null){
    var urlElement = document.createElement("a");
    urlElement.setAttribute("href", "https://" + clickedMarkerData.url);
    urlElement.setAttribute("target", "_blank");
    urlElement.textContent = "Website: " + clickedMarkerData.url;
    modalBody.prepend(urlElement);
  }
  modal.setAttribute('style', 'display: block;');
}
// close modal
var exitModal = document.getElementById('modal-exit');
exitModal.addEventListener("click", function(){
  modal.setAttribute('style', 'display: none;');
})

/* PLACES API CALL */
var bankData = new Map();

var search = "Bank";
var limit = 20;
var lat = 40.5086;
var lon = -112.0125;
var radius = 20000;

var placesRequestURL = `https://api.tomtom.com/search/2/categorySearch/${search}.json?key=gzfilgZ8uJFWF9BCQHsE4daKJN4bToA9&limit=${limit}&lat=${lat}&lon=${lon}&radius=${radius}`

var getPlaces = function(){
  fetch(placesRequestURL)
  .then(response => response.json())
  // Function for operating with result
  .then(function(result){
    console.log(result.results.length);
    for(var i = 0; i < result.results.length; i++){
      var marker = new L.Marker([result.results[i].position.lat, result.results[i].position.lon]);
      marker.addTo(map);
      bankData.set(marker, {
        'name': result.results[i].poi.name,
        'address': result.results[i].address.freeformAddress,
        'phone': result.results[i].poi.phone,
        'url': result.results[i].poi.url,
        'lat': result.results[i].position.lat,
        'lon': result.results[i].position.lon
      });
      marker.addEventListener("click", showModal);
    }
    console.log(result);
  })
  .catch(error => console.log('error', error));
}


var testing = function(lat, lon){
  var mapOptions = {
    center:[lat, lon], //Where map will start
    zoom:10
  }
  map = new L.map('map', mapOptions);
  map.addLayer(layer);
}

const successCallback = (position) => {
  testing(position.coords.latitude, position.coords.longitude);
};

const errorCallback = (error) => {
  console.log(error);
};

var testButton = document.getElementById("testingbutton");

testButton.addEventListener("click", function(event){
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {timeout:10000});
})
