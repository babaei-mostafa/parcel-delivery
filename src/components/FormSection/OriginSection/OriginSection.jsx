import { useState } from 'react'
import { getGeocode, getLatLng } from 'use-places-autocomplete'
import useStyles from './styles'
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import originIcon from '../../../assets/images/blue-dot.png'


export default function OriginSection({
  isVisible,
  onConfirmOrigin,
  setIsVisible,
  setOriginInputValue,
  originAutocompleteIsReady,
  originInputValue,
  originSuggestionsStatus,
  originDataSuggestions,
  setOriginSelection,
  clearOriginSuggestions,
  map,
  originSelection,
}) {
  const [senderName, setSenderName] = useState('')
  const [senderPhoneNumber, setSenderPhoneNumber] = useState('')
  const classes = useStyles()

  const handleOriginSelectSuggestion = (address) => () => {
    setOriginInputValue(address, false)
    setOriginSelection(null)
    clearOriginSuggestions()
    handleOriginSelect(address)
  }

  const handleOriginSelect = async (address) => {
    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    setOriginSelection({ lat, lng })
    console.log(originSelection)
    // Pan the map to the selected origin
    map.panTo({ lat, lng })
  }

    const isInputsFilled = senderName && senderPhoneNumber && originSelection

  if (!isVisible) {
    return (
      <Card variant="outlined" style={{ margin: '4px' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item>
                  <img
                    src={originIcon}
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
                    Origin
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography>{originInputValue}</Typography>
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
    <Card variant="outlined" style={{ margin: '4px' }}>
      <CardContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                {' '}
                <img
                  src={originIcon}
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
                  Origin
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={originDataSuggestions}
              getOptionLabel={(option) => option.description}
              inputValue={originInputValue}
              onChange={(event, value) => {
                if (value) {
                  handleOriginSelectSuggestion(value.description)()
                }
              }}
              onInputChange={(event, value) => {
                setOriginInputValue(value)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter origin"
                  variant="standard"
                  className={classes.input}
                  disabled={!originAutocompleteIsReady}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  variant="standard"
                  value={senderPhoneNumber}
                  onChange={(e) => setSenderPhoneNumber(e.target.value)}
                  style={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-basic"
                  label="Sender's Name"
                  variant="standard"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
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
                Choose from Favorites
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                style={{ width: '100%', height: '64px' }}
                onClick={onConfirmOrigin}
                disabled={!isInputsFilled}
              >
                Confirm Origin
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
