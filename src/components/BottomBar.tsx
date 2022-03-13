import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

export default function BottomBar() {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomBarIcons}>
        <MaterialIcons name="shopping-cart" size={20} color="#FFFFFF" />
        <Text style={styles.bottomBarIcons}>Carrinho</Text>
      </View>
      <View style={styles.bottomBarIcons}>
        <MaterialIcons name="search" size={20} color="#FFFFFF" />
        <Text style={styles.bottomBarIcons}>Procurar</Text>
      </View>
      <View style={styles.bottomBarIcons}>
        <MaterialIcons name="favorite" size={20} color="#FFFFFF" />
        <Text style={styles.bottomBarIcons}>Favoritos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: '#005723',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomBarIcons: {
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.74,
    fontSize: 10,
  },
});
