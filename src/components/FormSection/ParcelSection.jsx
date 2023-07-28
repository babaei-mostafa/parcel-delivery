import { useEffect, useState } from 'react'
import { getParcelTypes } from '../../firebase'
// import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import backupImage from '../../assets/images/D_small box.png'
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'

export default function ParcelSection({
  isVisible,
  setIsVisible,
  onChange,
  selectedParcelType,
  setSelectedParcelType,
}) {
  const [parcelTypes, setParcelTypes] = useState([])
  const [clickedIndex, setClickedIndex] = useState(null)

  const handleRowClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index)
  }
  //   const storage = getStorage()

  useEffect(() => {
    getParcelTypes()
      .then((data) => {
        setParcelTypes(data)
        // console.log(parcelTypes)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  //   const getImageUrl = async (imageName) => {
  //     const storageRef = ref(storage, `parcelsImage/${imageName}`)
  //     const url = await getDownloadURL(storageRef)
  //     return url
  //   }

  const handleParcelTypeSelect = (parcelType) => {
    setSelectedParcelType(parcelType)
  }

  if (!isVisible) {
    return (
      <Card variant="outlined" style={{ margin: '4px' }}>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" component="div">
                Parcel's Type
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography>{selectedParcelType?.parcel_type}</Typography>
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
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="body1" component="div">
                Parcel's Type
              </Typography>
            </Grid>
            {parcelTypes.map((parcelType, index) => (
              <Grid item xs={12} key={index}>
                <Grid
                  container
                  spacing={2}
                  onClick={() => handleRowClick(index)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      clickedIndex === index ? 'lightblue' : 'transparent',
                  }}
                  //   className="grid-row"
                >
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <img
                          src={backupImage}
                          alt="package"
                          style={{
                            width: '100%',
                            height: '50px',
                            objectFit: 'cover',
                          }}
                        />
                        {/* {parcelType.parcel_img_url && (
            <img
              src={getImageUrl(parcelType.parcel_img_url)}
              alt="Parcel"
            />
          )} */}
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1">
                          {parcelType.parcel_type}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="body1">
                          {parcelType.parcel_min_weight}
                          {' - '} {parcelType.parcel_max_weight} max
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {/* Text */}
                        <Typography variant="body1">
                          {parcelType.parcel_description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                style={{ width: '100%', height: '64px' }}
                onClick={() => onChange(parcelTypes[clickedIndex])}
                disabled={clickedIndex === null}
              >
                Confirm Parcel Type
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
