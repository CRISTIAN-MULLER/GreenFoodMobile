import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import LogoSVG from '../../assets/logo';
import Gradient from './Gradient';

export function Welcome({ navigation }) {
  function handleStart() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Gradient />
        <LogoSVG />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Text style={styles.text}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'linear-gradient(342.3deg, #1E4614 7.12%, #F4D03F 100%)',
    //background-blend-mode: multiply
  },
  button: {
    // position: 'absolute',
    width: '70%',
    height: '7%',
    //   left: 64,
    //   top: 450,
    backgroundColor: '#FF8108',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
