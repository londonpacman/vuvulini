
var map;
var rect;

function initialize() {
  var mapOptions = {
    zoom: 15,
    center: {lat: 51.460, lng: 0.050},
    mapTypeId: 'terrain'
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var bounds = {
    north: 51.480,
    south: 51.440,
    east: 0.050,
    west: 0.000,
  };

  // Define a rectangle and set its editable property to true.
  rect = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true
  });
  rect.setMap(map)
}

var items = [];

function calc() {
  for (var it of items) {
    it.setMap(null);
  }
  var n=4;
  var s = document.getElementById('canUse').value.split('');
  var digs = s.map(num => parseInt(num));
  var sw = rect.bounds.getSouthWest();
  var ne = rect.bounds.getNorthEast();
  function gen(i, j, ni, nj) {
    if (i === n) {
      if (j == 0) {
        var ri = ni*0.1;
        if (sw.lng() > ri || ri > ne.lng()) {
          return;
        }
      }
      if (j == n) {
        var ri = ni*0.1;
        var rj = 51 + nj*0.1;
        if (sw.lat() <= rj && rj <= ne.lat()) {
          var item = new google.maps.Marker({
            position: {lat: rj, lng: ri},
            map: map,
            title: '' + rj + ' ' + ri,
          })
          console.log(rj, ri)
        }
        return;
      }
      for (var d of digs) {
        gen(i, j+ 1, ni, nj*0.1 + d);
      }
    } else {
      for (var d of digs) {
        gen(i + 1, j, ni*0.1 + d, nj);
      }
    }
  }
  gen(0, 0, 0, 0);
}
