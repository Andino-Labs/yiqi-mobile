import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'
import Geocoder from 'react-native-geocoding'
import { errorHandler } from '@/helpers/errorHandler'

// Initialize the Geocoding API with your API key
Geocoder.init(process.env.EXPO_PUBLIC_MAPS_API || '')

interface LocationMapProps {
  locationString: string
}

const DEFAULT_REGION: Region = {
  latitude: 37.7749, // Default to San Francisco, CA
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05
}

const LocationMap: React.FC<LocationMapProps> = ({ locationString }) => {
  const [region, setRegion] = useState<Region>(DEFAULT_REGION)
  const [mapInitialized, setMapInitialized] = useState(false)

  // Geocode the location string and update region
  useEffect(() => {
    const geocodeLocation = async () => {
      try {
        const response = await Geocoder.from(locationString)
        const { lat, lng } = response.results[0].geometry.location
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        })
      } catch (error) {
        errorHandler(error)
      }
    }

    if (locationString) {
      geocodeLocation()
    }
  }, [locationString])

  // Handle map initialization
  const onMapReady = () => {
    if (mapInitialized) {
      return
    }

    // You can do any additional map setup here
    setMapInitialized(true)
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onMapReady={onMapReady} // Trigger when the map is ready
      >
        {mapInitialized && (
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude
            }}
          />
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300, // you can customize this
    width: '100%', // you can customize this
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})

export default LocationMap
