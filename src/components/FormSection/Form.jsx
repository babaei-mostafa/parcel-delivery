import { useState } from 'react'
import usePlacesAutocomplete from 'use-places-autocomplete'
import OriginSection from './OriginSection/OriginSection'
import DestinationSection from './DestinationSection/DestinationSection'
import ParcelSection from './ParcelSection/ParcelSection'
import TransportSection from './TransportSection/TransportSection'
import { Grid } from '@material-ui/core'

export default function Form({
  setOriginSelection,
  setDestinationSelection,
  transportMode,
  setTransportMode,
  map,
  originSelection,
  destinationSelection,
  directionsResponse,
  setDirectionsResponse,
  distance,
  setDistance,
  duration,
  setDuration,
  prices,
  setPrices,
}) {
  const [originSection, setOriginSection] = useState(true)
  const [destinatioSection, setDestinatioSection] = useState(false)
  const [packageSection, setPackageSection] = useState(false)
  const [transportSection, setTransportSection] = useState(false)
  const [selectedParcelType, setSelectedParcelType] = useState(null)
  const [routes, setRoutes] = useState([])
  const [durations, setDurations] = useState([])

  const {
    ready: originAutocompleteIsReady,
    value: originInputValue,
    suggestions: {
      status: originSuggestionsStatus,
      data: originDataSuggestions,
    },
    setValue: setOriginInputValue,
    clearSuggestions: clearOriginSuggestions,
  } = usePlacesAutocomplete()

  const {
    ready: destinationAutocompleteIsready,
    value: destinationInputValue,
    suggestions: {
      status: destinationSuggestionsStatus,
      data: destinationDataSuggestions,
    },
    setValue: setDestinationInputValue,
    clearSuggestions: clearDestinationSuggestions,
  } = usePlacesAutocomplete()

  const handleConfirmOrigin = () => {
    setOriginSection(false)
    setDestinatioSection(true)
  }

  const handleConfirmDestination = () => {
    setDestinatioSection(false)
    setPackageSection(true)
  }

  const handlePackageChange = (parcelType) => {
    setPackageSection(false)
    setTransportSection(true)
    setSelectedParcelType(parcelType)
    console.log(parcelType)
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <OriginSection
            isVisible={originSection}
            setIsVisible={setOriginSection}
            onConfirmOrigin={handleConfirmOrigin}
            setOriginInputValue={setOriginInputValue}
            originAutocompleteIsReady={originAutocompleteIsReady}
            originInputValue={originInputValue}
            originSuggestionsStatus={originSuggestionsStatus}
            originDataSuggestions={originDataSuggestions}
            setOriginSelection={setOriginSelection}
            clearOriginSuggestions={clearOriginSuggestions}
            map={map}
            originSelection={originSelection}
          />
        </Grid>
        <Grid item xs={12}>
          <DestinationSection
            isVisible={destinatioSection}
            setIsVisible={setDestinatioSection}
            onConfirmDestination={handleConfirmDestination}
            setDestinationInputValue={setDestinationInputValue}
            destinationAutocompleteIsready={destinationAutocompleteIsready}
            destinationInputValue={destinationInputValue}
            destinationSuggestionsStatus={destinationSuggestionsStatus}
            destinationDataSuggestions={destinationDataSuggestions}
            setDestinationSelection={setDestinationSelection}
            clearDestinationSuggestions={clearDestinationSuggestions}
            map={map}
            originSelection={originSelection}
            destinationSelection={destinationSelection}
            transportMode={transportMode}
            directionsResponse={directionsResponse}
            setDirectionsResponse={setDirectionsResponse}
            distance={distance}
            setDistance={setDistance}
            duration={duration}
            setDuration={setDuration}
          />
        </Grid>
        <Grid item xs={12}>
          <ParcelSection
            isVisible={packageSection}
            setIsVisible={setPackageSection}
            onChange={handlePackageChange}
            selectedParcelType={selectedParcelType}
            setSelectedParcelType={setSelectedParcelType}
          />
        </Grid>
        <Grid item xs={12}>
          <TransportSection
            isVisible={transportSection}
            setIsVisible={setTransportSection}
            setTransportMode={setTransportMode}
            selectedParcelType={selectedParcelType}
            distance={distance}
            duration={duration}
            map={map}
            originSelection={originSelection}
            destinationSelection={destinationSelection}
            routes={routes}
            setRoutes={setRoutes}
            durations={durations}
            setDurations={setDurations}
            prices={prices}
            setPrices={setPrices}
          />
        </Grid>
      </Grid>
    </div>
  )
}
