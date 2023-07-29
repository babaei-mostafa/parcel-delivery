import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { transportModes } from '../../../data'

export default function TransportSection({
  isVisible,
  setIsVisible,
  setTransportMode,
  selectedParcelType,
  transportMode,
  map,
  originSelection,
  destinationSelection,
  durations,
  setDurations,
  setRoutes,
  prices,
  setPrices,
}) {
  const [clickedIndex, setClickedIndex] = useState(null)
  const [error, setError] = useState(null)

  const handleCardClick = (mode, index) => {
    setClickedIndex(index === clickedIndex ? null : index)
    console.log(clickedIndex)
    console.log(prices)
    if (selectedParcelType.vehicle_type[mode]) {
      setTransportMode(mode.toUpperCase())
    }
  }

  async function calculateRoutes() {
    if (originSelection === null || destinationSelection === null) {
      return
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()

    try {
      const modes = ['DRIVING', 'WALKING', 'BICYCLING']
      const newRoutes = []
      const newDurations = []
      const newPrices = []

      for (const mode of modes) {
        const results = await directionsService.route({
          origin: originSelection,
          destination: destinationSelection,
          travelMode: mode,
        })

        newRoutes.push(results.routes[0])
        newDurations.push(results.routes[0].legs[0].duration.text)
        newPrices.push(
          calculatePrice(results.routes[0].legs[0].duration.text, mode)
        )
      }

      setRoutes(newRoutes)
      setDurations(newDurations)
      setPrices(newPrices)
      console.log(prices)
      setError(null)
    } catch (error) {
      console.log('Error calculating routes:', error)
      setError('Error calculating routes. Please try again.')
    }
  }

  useEffect(() => {
    calculateRoutes()
  }, [originSelection, destinationSelection, map, selectedParcelType])

  function calculatePrice(duration, mode) {
    let costPerMinute = 0

    switch (mode) {
      case 'DRIVING':
        costPerMinute = 0.5
        break
      case 'WALKING':
        costPerMinute = 0.1
        break
      case 'BICYCLING':
        costPerMinute = 0.2
        break
      default:
        return null
    }

    const totalCost = parseFloat(duration) * costPerMinute

    return totalCost.toFixed(2)
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
              <Grid container alignItems="center">
                <Grid item>
                  <Typography>{transportMode}</Typography>
                </Grid>
                <Grid item>
                  <Button onClick={() => setIsVisible(true)}>Edit</Button>
                </Grid>
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
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="body1" component="div">
              Transport Options
            </Typography>
          </Grid>
          {transportModes.map((mode, index) => (
            <Grid item xs={4} key={index}>
              <Card
                onClick={() => handleCardClick(mode.mode, index)}
                style={{
                  cursor: selectedParcelType.vehicle_type[mode.mode]
                    ? 'pointer'
                    : 'not-allowed',
                  backgroundColor:
                    clickedIndex === index
                      ? 'lightblue'
                      : selectedParcelType.vehicle_type[mode.mode]
                      ? 'transparent'
                      : 'gray',
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height={100}
                  style={{ objectFit: 'contain' }}
                  image={mode.image}
                />
                <CardContent>
                  {selectedParcelType.vehicle_type[mode.mode] ? (
                    <>
                      <Typography variant="body2">
                        Price: $
                        {calculatePrice(
                          durations[index],
                          `${mode.mode.toUpperCase()}`
                        )}
                      </Typography>
                      <Typography variant="body2">
                        {durations[index]}
                      </Typography>
                    </>
                  ) : (
                    <Typography variant="body2">Not an Option</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography>Duration: {durations[clickedIndex]}</Typography>
            <Typography>Price: ${prices[clickedIndex]}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              style={{ width: '100%', height: '64px' }}
              // onClick={() => onChange(parcelTypes[clickedIndex])}
              disabled={clickedIndex === null}
            >
              Confirm Transport Option
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
