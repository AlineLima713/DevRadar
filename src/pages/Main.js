import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0176,
          longitudeDelta: 0.0176,
        })
      }
    }

    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -8.468146, longitude: -35.731846 }}>
        <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/39857752?s=460&u=1e0dd14e0e4b597d28e5b409377fbd2aee1d37a8&v=4' }}/>
        
        <Callout>
          <View style={styles.callout}> 
            <Text style={styles.devName}>Marcelo Lima</Text>
            <Text style={styles.devBio}>I am a full stack developer, majoring in Information Systems at the university of Pernambuco (UPE), currently in the 5th semester.</Text>
            <Text style={styles.devTechs}>ReactJs, React Native, Node.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },

  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },
})

export default Main;