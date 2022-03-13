import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Text,
  FlatList,
} from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

import api from '../services/api';

import { Load } from '../components/Load';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';

import ProductCardPrimary from '../components/ProductCardPrimary';
import { useRoute } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type Props = {
  navigation: MenuScreenNavigationProp;
};

type Params = {
  token: string;
};
type UserProfile = {
  email: string;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
};

export function Menu({ navigation }: Props) {
  const routes = useRoute();
  const { token } = routes.params as Params;

  const { products, loading } = useContext(ProductContext);
  const [loadingMore, setLoadingMore] = useState(false);

  const [profile, setProfile] = useState({} as UserProfile);

  const [page, setPage] = useState(1);

  const loadProfiles = async () => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`
    );
    const userInfo = await response.json();
    setProfile(userInfo);
  };

  if (loading) return <Load />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TopBar profile={profile} />
        <View style={styles.productsCard}>
          <FlatList
            data={products}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => (
              <ProductCardPrimary
                data={item}
                // onPress={() => handlePlantCarSelected(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            //onEndReachedThreshold={0.1}
            // onEndReached={({ distanceFromEnd }) =>
            //   handleFetchMore(distanceFromEnd)
            // }
            // ListFooterComponent={
            // //  <BottomBar />
            //   //loadingMore ? <ActivityIndicator color={'green'} /> : <></>
            // }
          ></FlatList>
        </View>
        <BottomBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  wrapper: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'space-between',
  },
  productsCard: {
    flex: 1,
    padding: 10,
  },
});
