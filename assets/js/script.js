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


/* GENERATE MARKERS */
var bankData = new Map();
var getPlaces = function(lat, lon){
  // query criteria
  var search = "Bank";
  var limit = 20;
  var radius = 20000;
  // query
  var placesRequestURL = `https://api.tomtom.com/search/2/categorySearch/${search}.json?key=gzfilgZ8uJFWF9BCQHsE4daKJN4bToA9&limit=${limit}&lat=${lat}&lon=${lon}&radius=${radius}`
  // api call
  fetch(placesRequestURL)
  .then(response => response.json())
  .then(function(result){
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
  })
  .catch(error => console.log('error', error));
}


/* GENERATE MODALS FOR MARKERS */
// modal html elements
var modalTitle = document.getElementById('modal-title');
var modalBody = document.getElementById('modal-body');
var modal = document.getElementById('modal');
var directionsButton = document.getElementById("modal-maps");
var addressElement = document.getElementById("modal-address");
var phoneElement = document.getElementById("modal-phone");
var urlElement = document.getElementById("modal-website");

var showModal = function(event){
  var clickedMarkerData = bankData.get(event.target);
  // diplay bank name
  modalTitle.textContent = clickedMarkerData.name
  // display address
  if(clickedMarkerData.address != undefined && clickedMarkerData.address != null){
    addressElement.textContent = "Address: " + clickedMarkerData.address;
    directionsButton.setAttribute("href", `https://maps.google.com/?q=${clickedMarkerData.address}`);
    directionsButton.setAttribute("target", "_blank");
    directionsButton.textContent = "GOOGLE MAPS";
  }
  // display phone number
  if(clickedMarkerData.phone != undefined && clickedMarkerData.phone != null){
    phoneElement.setAttribute("href", "tel:" + clickedMarkerData.phone);
    phoneElement.setAttribute("target", "_blank");
    phoneElement.textContent = "Phone: " + clickedMarkerData.phone;
  }
  // display bank website
  if(clickedMarkerData.url != undefined && clickedMarkerData.url != null){
    urlElement.setAttribute("href", "https://" + clickedMarkerData.url);
    urlElement.setAttribute("target", "_blank");
    urlElement.textContent = "Website: " + clickedMarkerData.url;
  }
  modal.setAttribute('style', 'display: block;'); // show modal
}
// close modal
var exitModal = document.getElementById('modal-exit');
exitModal.addEventListener("click", function(){
  modal.setAttribute('style', 'display: none;'); // hide modal
});


/* GENERATE MAP DIV */ 
var mapBase = document.getElementById("map-base");
var map;
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var showMap = function(lat, lon){
  mapBase.setAttribute("style", "display: block;")
  var mapOptions = {
    center:[lat, lon], //Where map will start
    zoom:14 // map zoom
  }
  map = new L.map('map', mapOptions);
  map.addLayer(layer);
  getPlaces(lat, lon);
}


/* ASK USER FOR LOCATION */ 
var locationModal = document.getElementById("location-modal");
var exitLocationModal = document.getElementById("location-modal-exit");
exitLocationModal.addEventListener("click", function(){
  locationModal.setAttribute("style", "display: none;");
  location.reload();
})

const locationEnabled = (position) => {
  showMap(position.coords.latitude, position.coords.longitude);
};
const locationDisabled = (error) => {
  console.log(error);
  locationModal.setAttribute("style", "display: block;");
};
navigator.geolocation.getCurrentPosition(locationEnabled, locationDisabled, {timeout:10000});
