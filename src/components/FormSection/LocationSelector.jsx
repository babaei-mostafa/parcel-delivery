import usePlacesAutocomplete from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import useStyles from './styles'

export default function LocationSelector({
  label,
  value,
  onChange,
  onSelectSuggestion,
  autocompleteIsReady,
  suggestionsStatus,
  dataSuggestions,
  placeholder,
}) {
  const classes = useStyles()

  const { setValue, clearSuggestions } = usePlacesAutocomplete()

  const handleChange = (e) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

const handleSelectSuggestion = (address) => () => {
  console.log('Selected address:', address)
  setValue(address)
  clearSuggestions()
  onChange(address)
  onSelectSuggestion(address)
  console.log('Suggestions cleared')
}

  return (
    <div>
      {label && <label>{label}</label>}
      <Combobox onSelect={handleSelectSuggestion}>
        <ComboboxInput
          value={value}
          onChange={handleChange}
          disabled={!autocompleteIsReady}
          placeholder={placeholder}
          className={classes.input}
        />
        <ComboboxPopover>
          <ComboboxList>
            {suggestionsStatus === 'OK' &&
              dataSuggestions.map(({ description }) => (
                <ComboboxOption
                  key={description}
                  value={description}
                  onClick={handleSelectSuggestion(description)}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}
