import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps'

interface LocationMapProps {
  coordinates?: {
    lat?: number | null
    lon?: number | null
  } | null
}

const DEFAULT_REGION: Region = {
  latitude: 37.7749, // Default to San Francisco, CA
  longitude: -122.4194,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05
}

const LocationMap: React.FC<LocationMapProps> = ({
  coordinates = { lat: DEFAULT_REGION.latitude, lon: DEFAULT_REGION.longitude }
}) => {
  const [mapInitialized, setMapInitialized] = useState(false)

  // Only render the map if coordinates are valid (not null or undefined)
  if (coordinates?.lat == null || coordinates?.lon == null) return null

  // Determine the initial region based on props or fallback to default
  const initialRegion: Region = {
    latitude: coordinates.lat ?? DEFAULT_REGION.latitude,
    longitude: coordinates.lon ?? DEFAULT_REGION.longitude,
    latitudeDelta: DEFAULT_REGION.latitudeDelta,
    longitudeDelta: DEFAULT_REGION.longitudeDelta
  }

  // Handle map readiness
  const onMapReady = () => setMapInitialized(true)

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        onMapReady={onMapReady}
      >
        {mapInitialized && (
          <Marker
            coordinate={{
              latitude: coordinates.lat ?? DEFAULT_REGION.latitude,
              longitude: coordinates.lon ?? DEFAULT_REGION.longitude
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
    height: 200, // Adjust as needed
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  }
})

export default LocationMap
