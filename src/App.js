import {useState} from 'react';
import './App.css';
import {
  GoogleMap, 
  withScriptjs, 
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import * as parksData from './skateboard.json';

function Map(){
  const [selectedPark, setSelectedPark] = useState(null);

  return (
    <GoogleMap 
      defaultZoom={10} 
      defaultCenter={{lat: 45.420420, lng: -75.692430}}
    >
      {
        parksData.features.map((park) => {
          return (
            <Marker 
              key={park.properties.PARK_ID}
              position={{
                lat: park.geometry.coordinates[1],
                lng: park.geometry.coordinates[0]
              }}
              onClick={() => setSelectedPark(park)}
              // icon={{
              //   url: '/icon.svg',
              //   scaledSize: new window.google.maps.Size(25, 25)
              // }}
            />
          )
        })
      }

      {
        selectedPark && <InfoWindow
        position={{
          lat: selectedPark.geometry.coordinates[1],
          lng: selectedPark.geometry.coordinates[0]
        }}
        onCloseClick={() => setSelectedPark(null)}>
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      }
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

function App() {
  return (
    <div className="App" style={{width: "100vw", height: "100vh"}}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
        loadingElement={<div style={{height: "100%"}}/>}
        containerElement={<div style={{height: "100%"}}/>}
        mapElement={<div style={{height: "100%"}}/>}
      />
    </div>
  );
}

export default App;
