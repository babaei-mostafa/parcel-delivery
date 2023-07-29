import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import useStyles from './styles'
import { useMemo } from 'react'

export default function Map({
  originSelection,
  destinationSelection,
  directionsResponse,
  setMap,
}) {
  const center = useMemo(() => ({ lat: -33, lng: 151 }), [])
  const classes = useStyles()

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName={classes.mapContainer}
      onLoad={(map) => setMap(map)}
    >
      {originSelection && (
        <Marker
          position={originSelection}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }}
        />
      )}
      {destinationSelection && (
        <Marker
          position={destinationSelection}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
          }}
        />
      )}
      {directionsResponse && (
        <DirectionsRenderer
          directions={directionsResponse}
          options={{ suppressMarkers: true }}
        />
      )}
    </GoogleMap>
  )
}
