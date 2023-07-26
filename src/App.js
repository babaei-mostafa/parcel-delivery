import { CssBaseline, Grid } from '@material-ui/core'
import Form from './components/FormSection/Form'
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { MapProvider } from './context/mapContext'
import SearchBar from './components/SearchBar'
// import MapTwo from './components/MapTwo'
import Home from './components/MapThree/MapThree'
import ParentComponent from './components/Test/ParentComponent'
import MapThree from "./components/MapThree/MapThree"
import MapTwo from './components/MapTwo/MapTwo'

const center = {
  lat: 37.7749,
  lng: -122.4194,
}

function App() {
  return (
    // <MapProvider>
    //   <LoadScript
    //     googleMapsApiKey="AIzaSyASGf3xaQKOEsMZaYET96y4yh0GI9oI4pk"
    //     libraries={['places']}
    //   >
    //     <SearchBar />
    //     <GoogleMap center={center} zoom={10}>
    //       <MapTwo />
    //     </GoogleMap>
    //   </LoadScript>
    // </MapProvider>
    <div>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={5}>
          <Form />
        </Grid>
        <Grid item xs={12} md={7}>
          {/* <MapThree /> */}
          <MapTwo />
        </Grid>
      </Grid>
    </div>
    // <Home />
    // <ParentComponent />
  )
}

export default App
