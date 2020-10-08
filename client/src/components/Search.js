import React, { useCallback, useState, useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestion,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 32.776665, lng: () => -96.796989 },
      radius: 100 * 1000,
    },
  });

  return (
    <div className="map-container__search">
      <Combobox
        onSelect={(address) => {
          console.log(address);
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
