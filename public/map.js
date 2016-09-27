var Map = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });

}

Map.prototype = {
 addMarker: function(coords, info){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap
    });
    var infoWindow = new google.maps.InfoWindow({
      content: info
    })
    marker.addListener("click", function(){
      infoWindow.open(this.googleMap, marker);
    })
  },
  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, "click", function(event){
      var position = {lat:event.latLng.lat(), lng:event.latLng.lng()}
      var direction = this.howClose(position);
      console.log(direction);
      this.addMarker(position, direction);
    }.bind(this))
  },
  howClose: function(coords){
    var direction = "";
    var differenceLat = coords.lat - this.googleMap.center.lat();
    var differenceLng = coords.lng - this.googleMap.center.lng();
      if(differenceLat < 0.05  && differenceLng > 0){
        console.log("positive")
        if(differenceLng < 0.05 && differenceLng > 0){
          console.log(differenceLat);
          console.log(differenceLng);
          this.foundCenter();
        }else if(differenceLng > -0.05 && differenceLng < 0){
          console.log(differenceLat);
          console.log(differenceLng);
          this.foundCenter();
        }
      };
      if(differenceLat > -0.05  && differenceLng < 0){
        console.log("negative")
        if(differenceLng > -0.05 && differenceLng < 0){
          console.log(differenceLat);
          console.log(differenceLng);
          this.foundCenter();
        }else if(differenceLng < 0.05 && differenceLng > 0){
          console.log(differenceLat);
          console.log(differenceLng);
          this.foundCenter();
        }
      };
    
    if(differenceLat < 0 ){
      direction  = "Above ";
    }else {
      direction = "Below ";
    };
    if(differenceLng < 0){
      direction += "and Right";
    }else{
      direction += "and Left";
    }
    return direction;
  },
  foundCenter: function(){
    this.addMarker(this.googleMap.center, "Found It");
  }
}