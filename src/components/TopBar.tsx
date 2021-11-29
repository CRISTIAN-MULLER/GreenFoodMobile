import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TextLogoSVG from '../../assets/TextLogoSVG';

type UserProfile = {
  email: string;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
};

export default function TopBar<UserProfile>({ profile }) {
  return (
    <View style={styles.topBar}>
      <Ionicons name="menu" size={36} color="#FFFFFF" />
      <View style={styles.topBarTextView}>
        <TextLogoSVG height="120" width="140" />
      </View>

      <MaterialCommunityIcons name="bell" size={24} color="#FFFFFF" />
      <Image
        source={{ uri: profile.picture }}
        style={{
          //flex: 1,
          width: 45,
          height: 45,
          borderRadius: 50,
          resizeMode: 'contain',
        }}
      />

      {/* <Ionicons name="md-share-social-sharp" size={24} color="#FFFFFF" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#005723',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  topBarTextView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginHorizontal: 50,
  },
});
