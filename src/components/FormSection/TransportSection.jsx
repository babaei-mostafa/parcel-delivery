import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import drivingImg from '../../assets/images/motor.png'
import bicyclingImg from '../../assets/images/bike.png'
import walkingImg from '../../assets/images/walk2.png'

export default function PackageSection({
  isVisible,
  setIsVisible,
  setTransportMode,
  selectedParcelType,
  transportMode,
}) {
  // const vehicleType = selectedParcelType?.vehicle_type

  const handleCardClick = (mode) => {
    if (selectedParcelType.vehicle_type[mode]) {
      setTransportMode(mode.toUpperCase())
    }
  }

  if (!isVisible) {
    return (
      <Card variant="outlined" style={{ margin: '4px' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" component="div">
                Transport Options
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography>{transportMode}</Typography>
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
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="body1" component="div">
              Transport Options
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              onClick={() => handleCardClick('driving')}
              style={{
                cursor: selectedParcelType.vehicle_type.driving
                  ? 'pointer'
                  : 'not-allowed',
                backgroundColor:
                  transportMode === 'driving' ? 'lightblue' : 'transparent',
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height={100}
                image={drivingImg}
              />
              <CardContent>
                {selectedParcelType.vehicle_type.driving ? (
                  <Typography variant="body2">Price</Typography>
                ) : (
                  <Typography variant="body2">No</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              onClick={() => handleCardClick('bicycling')}
              style={{
                cursor: selectedParcelType.vehicle_type.bicycling
                  ? 'pointer'
                  : 'not-allowed',
                backgroundColor:
                  transportMode === 'bicycling' ? 'lightblue' : 'transparent',
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height={100}
                image={bicyclingImg}
              />
              <CardContent>
                {selectedParcelType.vehicle_type.bicycling ? (
                  <Typography variant="body2">Price</Typography>
                ) : (
                  <Typography variant="body2">No</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              onClick={() => handleCardClick('walking')}
              style={{
                cursor: selectedParcelType.vehicle_type.walking
                  ? 'pointer'
                  : 'not-allowed',
                backgroundColor:
                  transportMode === 'walking' ? 'lightblue' : 'transparent',
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height={100}
                style={{ objectFit: 'contain' }}
                image={walkingImg}
              />
              <CardContent>
                {selectedParcelType.vehicle_type.walking ? (
                  <Typography variant="body2">Price</Typography>
                ) : (
                  <Typography variant="body2">No</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              style={{ width: '100%', height: '64px' }}
              onClick={() => setIsVisible(false)}
            >
              Confirm Transport Option
            </Button>
          </Grid>
        </Grid>
        {/* <h2>Section 4</h2>
      <select value={selection} onChange={handleChange}>
        <option value="DRIVING">Driving</option>
        <option value="BICYCLING">Bicycling</option>
        <option value="TRANSIT">Transit</option>
        <option value="WALKING">Walking</option>
      </select>
      <button onClick={() => setIsVisible(false)}>Save Changes</button> */}
      </CardContent>
    </Card>
  )
}
