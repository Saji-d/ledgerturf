import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const defaultCenter = {
  lat: 23.8103,
  lng: 90.4125
};

const MapPicker = ({ onLocationSelect, initialLocation }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [marker, setMarker] = React.useState(initialLocation || defaultCenter);

  const onClick = React.useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });
    onLocationSelect({ lat, lng });
  }, [onLocationSelect]);

  if (!isLoaded) return <div className="h-[300px] w-full bg-gray-100 rounded-3xl animate-pulse" />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker}
      zoom={13}
      onClick={onClick}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }]
      }}
    >
      <Marker position={marker} />
    </GoogleMap>
  );
};

export default React.memo(MapPicker);
