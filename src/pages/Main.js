import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

function Main({ navigation }) {
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
    <>
      <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -8.468146, longitude: -35.731846 }}>
          <Image style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/39857752?s=460&u=1e0dd14e0e4b597d28e5b409377fbd2aee1d37a8&v=4' }}/>
          
          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'MRLSK8' });
          }}>
            <View style={styles.callout}> 
              <Text style={styles.devName}>Marcelo Lima</Text>
              <Text style={styles.devBio}>I am a full stack developer, majoring in Information Systems at the university of Pernambuco (UPE), currently in the 5th semester.</Text>
              <Text style={styles.devTechs}>ReactJs, React Native, Node.js</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <View style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
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

  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8E4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
})

export default Main;