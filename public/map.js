var Map = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });

}

Map.prototype = {
 addMarker: function(coords, info, popUp){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    var infoWindow = new google.maps.InfoWindow({
      content: info
    })
    if(popUp){      
      infoWindow.open(this.googleMap, marker);
    }
    marker.addListener("click", function(){
      infoWindow.open(this.googleMap, marker);
    })
  },
  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, "click", function(event){
      var position = {lat:event.latLng.lat(), lng:event.latLng.lng()}
      var direction = this.howClose(position);
      this.addMarker(position, direction);
    }.bind(this))
  },
  howClose: function(coords){
    var direction = "";
    var differenceLat = coords.lat - this.googleMap.center.lat();
    var differenceLng = coords.lng - this.googleMap.center.lng();
    var mapDiffLat = Math.abs(differenceLat);
    var mapDiffLng = Math.abs(differenceLng);

    if(mapDiffLat < 0.05  && mapDiffLat > 0){
      if(mapDiffLng < 0.05 && mapDiffLng > 0){
        this.foundCenter();
      };
    };
    
    direction = this.directionAway(differenceLat, differenceLat);
    return direction;
  },
  foundCenter: function(){
    this.addMarker(this.googleMap.center, "Found It", true);
  }, 
  directionAway: function(diffLat, diffLng){
    var direction = "";
    if(diffLat < 0 ){
      direction  += "Above ";
    }else {
      direction += "Below ";
    };
    if(diffLng < 0){
      direction += "and Right";
    }else{
      direction += "and Left";
    }
    return direction;
  }
}