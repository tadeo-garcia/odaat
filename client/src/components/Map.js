import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import {formatRelative} from "date-fns";
import usePlacesAutocomplete, {getGeoCode, getLatLng} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from 'combobox';
import mapStyle from "./MapStyle"

const libraries = ["places"]
const mapContainerStyle={
  width:"100%",
  height:"100%"
}
const center = {
  lat: 32.776665,
  lng: -96.796989
}

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
}

export default function MapApi() {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if(loadError) return "Error loading maps"
  if(!isLoaded) return "Loading Maps"


  return (
    <>
      <div id='map-container'>
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options}>

          </GoogleMap>

      </div>
      
    </>
  )
}

