import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { useState, useEffect } from "react";

function MapComponent(props) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const mapClicked = (mapProps, map, clickEvent) => {
    let lat = clickEvent.latLng.lat();
    let lng = clickEvent.latLng.lng();
    setLocation({ lat, lng });
    props.locChange(location);
  };

  useEffect(() => {
    setLocation(props.location);
  }, []);

  return (
    <Map
      google={props.google}
      zoom={16}
      initialCenter={props.location}
      onClick={mapClicked}
    >
      <Marker
        title={"Your current location"}
        name={"Location"}
        position={location}
      />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDqxXvhGkIPwFcXgOf3PLT4Mo2qL-joxjM",
})(MapComponent);
