var map;
function initialize() {
  // Create a simple map.
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 2,
    center: {lat: 0, lng: 0}
  });

  // Load country boundaries from GeoJSON
  map.data.loadGeoJson('/maps/countries.json');

  map.data.setStyle(function(feature) {
    return ({
      fillColor: feature.getProperty("color"),
      visible: feature.getProperty("visible"),
      strokeColor: "black",
      strokeWeight: 1
    });
  });

  // Global infowindow
  var infowindow = new google.maps.InfoWindow();

  // When the user clicks
  map.data.addListener('click', function(event) {
    var properties = event.feature.k;
    console.log(properties);
    var name = event.feature.getProperty("name");
    $('#country-name').html(name);
  });  

  map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {fillColor: "blue", strokeWeight: 2});
  });

  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
  });

  function updateStyle(){
    map.data.setStyle(function(feature) {
      return ({
        fillColor: numToColorGradient(Math.random() * 2 - 1),
        strokeColor: "black",
        strokeWeight: 1
      });
    });
  }

  // var color = numToColorGradient(-1);
  // console.log(color);
  // var intervalID = window.setInterval(updateStyle, 3000);

}