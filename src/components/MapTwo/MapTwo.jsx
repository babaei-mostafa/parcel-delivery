/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import { useMemo, useState, useRef } from 'react'
import {
  useLoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import '@reach/combobox/styles.css'
import useStyles from './styles'
import Form from '../FormSection/Form'

export default function MapTwo() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk',
    libraries: ['places'],
  })

  if (!isLoaded) return <h3>Loading...</h3>
  return (
    <div>
      <Map />
    </div>
  )
}

function Map() {
  const center = useMemo(() => ({ lat: -33, lng: 151 }), [])
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [originSelection, setOriginSelection] = useState(null)
  const [destinationSelection, setDestinationSelection] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [transportMode, setTransportMode] = useState('DRIVING')
  const classes = useStyles()

  async function calculateRoute() {
    if (originSelection === '' || destinationSelection === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originSelection,
      destination: destinationSelection,
      travelMode: transportMode,
    })
    setDirectionsResponse(results)
    setOriginSelection('')
    setDestinationSelection('')

    // Get the bounds of the route
    const bounds = new google.maps.LatLngBounds()
    results.routes[0].legs.forEach((leg) => {
      leg.steps.forEach((step) => {
        step.path.forEach((point) => {
          bounds.extend(point)
        })
      })
    })

    // Fit the bounds of the route on the map
    map.fitBounds(bounds)
  }
  return (
    <>
      <div className="places-container">
        {/* <Form
          setOriginSelection={setOriginSelection}
          setDestinationSelection={setDestinationSelection}
          calculateRoute={calculateRoute}
          transportMode={transportMode}
          setTransportMode={setTransportMode}
          map={map}
        /> */}
      </div>
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
        {destinationSelection && <Marker position={destinationSelection} />}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  )
}
