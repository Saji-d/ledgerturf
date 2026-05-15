import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 23.8103,
  lng: 90.4125 // Dhaka center
};

const MapComponent = ({ turfs }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [selectedTurf, setSelectedTurf] = React.useState(null);
  const navigate = useNavigate();

  if (!isLoaded) return <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center font-bold text-gray-400">Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      options={{
        styles: [
          {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {turfs.map(turf => (
        <Marker 
          key={turf._id}
          position={{
            lat: turf.location.coordinates[1],
            lng: turf.location.coordinates[0]
          }}
          onClick={() => setSelectedTurf(turf)}
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }}
        />
      ))}

      {selectedTurf && (
        <InfoWindow
          position={{
            lat: selectedTurf.location.coordinates[1],
            lng: selectedTurf.location.coordinates[0]
          }}
          onCloseClick={() => setSelectedTurf(null)}
        >
          <div className="p-2 max-w-[200px]">
            <img src={selectedTurf.images[0]} className="w-full h-24 object-cover rounded-lg mb-2" alt="" />
            <h3 className="font-bold text-gray-900">{selectedTurf.name}</h3>
            <p className="text-xs text-gray-500 mb-2">{selectedTurf.location.area}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-primary text-sm">৳{selectedTurf.pricePerHour}</span>
              <button 
                onClick={() => navigate(`/turfs/${selectedTurf._id}`)}
                className="bg-gray-900 text-white px-3 py-1 rounded-md text-[10px] font-bold"
              >
                Details
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(MapComponent);
