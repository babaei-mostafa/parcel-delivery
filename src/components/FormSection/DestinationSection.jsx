import { useState, useEffect } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import { getGeocode, getLatLng } from 'use-places-autocomplete'

import useStyles from '../MapTwo/styles'
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import destinationIcon from '../../assets/images/orange-dot.png'


export default function DestinationSection({
  isVisible,
  setIsVisible,
  onConfirmDestination,
  setDestinationInputValue,
  destinationAutocompleteIsready,
  destinationInputValue,
  destinationSuggestionsStatus,
  destinationDataSuggestions,
  setDestinationSelection,
  clearDestinationSuggestions,
  map,
  originSelection,
  destinationSelection,
  transportMode,
  google,
  setDirectionsResponse,
  setDistance,
  setDuration,
  duration,
}) {
  const [recipientName, setRecipientName] = useState('')
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('')
  const [error, setError] = useState(null)
  const classes = useStyles()

  const handleDestinationSelectSuggestion = (address) => () => {
    setDestinationInputValue(address, false)
    setDestinationSelection(null)
    clearDestinationSuggestions()
    handleDestinationSelect(address)
  }

  const handleDestinationSelect = async (address) => {
    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    setDestinationSelection({ lat, lng })
  }

  async function calculateRoute() {
    if (originSelection === null || destinationSelection === null) {
      return
    }

    const directionsService = new google.maps.DirectionsService()

    try {
      const results = await directionsService.route({
        origin: originSelection,
        destination: destinationSelection,
        travelMode: transportMode,
      })

      setDirectionsResponse(results)

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
      setError(null) // Clear any previous error messages
    } catch (error) {
      console.log('Error calculating route:', error)
      setError('Error calculating route. Please try again.') // Set the error message
    }
  }

  useEffect(() => {
    calculateRoute()
  }, [originSelection, destinationSelection, transportMode, map])

  if (!isVisible) {
    return (
      <Card variant="outlined" style={{ margin: '4px' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <img
                    src={destinationIcon}
                    alt="package"
                    style={{
                      width: '25px',
                      height: '25px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body1" component="div">
                    Destination
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography>{destinationInputValue}</Typography>
                </Grid>
                <Button onClick={() => setIsVisible(true)}>Edit</Button>
                <Grid item></Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card variant="outlined" style={{ margin: '4px' }}>
        <CardContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <img
                    src={destinationIcon}
                    alt="package"
                    style={{
                      width: '25px',
                      height: '25px',
                      objectFit: 'cover',
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body1" component="div">
                    Destination
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={destinationDataSuggestions}
                getOptionLabel={(option) => option.description}
                inputValue={destinationInputValue}
                onChange={(event, value) => {
                  if (value) {
                    handleDestinationSelectSuggestion(value.description)()
                  }
                }}
                onInputChange={(event, value) => {
                  setDestinationInputValue(value)
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Enter Destination"
                    variant="standard"
                    className={classes.input}
                    disabled={!destinationAutocompleteIsready}
                  />
                )}
              />
            </Grid>

            {/* <div className="sender-input-container"> */}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="standard"
                    value={recipientPhoneNumber}
                    onChange={(e) => setRecipientPhoneNumber(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="outlined-basic"
                    label="Recipient's Name"
                    variant="standard"
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  style={{ width: '100%', height: '64px' }}
                >
                  Choose from favorites
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  style={{ width: '100%', height: '64px' }}
                  onClick={onConfirmDestination}
                >
                  Confirm Destination
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
