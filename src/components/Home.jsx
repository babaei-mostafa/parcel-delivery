/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import '@reach/combobox/styles.css'
import Form from './FormSection/Form'
import Map from './Map'
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './Header/Header'
import '../Home.css'

export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk',
    libraries: ['places'],
  })

  const [map, setMap] = useState(null)
  const [originSelection, setOriginSelection] = useState(null)
  const [destinationSelection, setDestinationSelection] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [transportMode, setTransportMode] = useState('DRIVING')
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [prices, setPrices] = useState([])

  if (loadError) return <div>Error loading Google Maps API</div>
  if (!isLoaded) return <h3>Loading...</h3>
  return (
    <div>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%', marginTop: '4px' }}>
        <Grid item sm={12} md={5}>
          <Form
            originSelection={originSelection}
            setOriginSelection={setOriginSelection}
            destinationSelection={destinationSelection}
            setDestinationSelection={setDestinationSelection}
            transportMode={transportMode}
            setTransportMode={setTransportMode}
            map={map}
            google={google}
            directionsResponse={directionsResponse}
            setDirectionsResponse={setDirectionsResponse}
            setDistance={setDistance}
            distance={distance}
            setDuration={setDuration}
            duration={duration}
            prices={prices}
            setPrices={setPrices}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          {/* <MapThree /> */}
          <Map
            originSelection={originSelection}
            destinationSelection={destinationSelection}
            directionsResponse={directionsResponse}
            setMap={setMap}
          />
        </Grid>
      </Grid>
    </div>
  )
}
