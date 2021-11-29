import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

import api from '../services/api';

import { Load } from '../components/Load';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';

import ProductCardPrimary from '../components/ProductCardPrimary';
import { useRoute } from '@react-navigation/native';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type ProductProps = {
  _id: { $oid: string };
  name: string;
  image: string;
  saleUnits: [
    {
      active: boolean;
      _id: { $oid: string };
      saleUnit: string;
      price: { $numberDouble: number };
      description: string;
    }
  ];
  category: string;
  active: boolean;
};

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

  const [profile, setProfile] = useState({} as UserProfile);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [page, setPage] = useState(1);

  //const [enviroments, setEnviroments] = useState<EnviromentProps[]>();
  //const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>();
  //const [enviromentSelected, setEnviromentSelected] = useState('All');
  const [loading, setLoading] = useState(true);

  const [loadingMore, setLoadingMore] = useState(false);

  async function fetchProducts() {
    const { data } = await api.get(
      `products?_sort=name&_order=asc&_page=${page}&_limit=4`,
      {
        params: {
          _limit: 4,
        },
      }
    );

    if (!data) return setLoading(true);
    if (page > 1) {
      setProducts((oldValue) => [...oldValue, ...data]);

      // setFilteredProducts((oldValue) => [...oldValue, ...data]);
    } else {
      setProducts(data);
      // setFilteredProducts(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  const loadProfiles = async () => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`
    );
    const userInfo = await response.json();
    setProfile(userInfo);
  };

  function handleFetchMore(distance: number) {
    if (distance < 1) return;
    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchProducts();
  }

  useEffect(() => {
    loadProfiles();
    fetchProducts();
  }, []);

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
            onEndReachedThreshold={0.1}
            onEndReached={({ distanceFromEnd }) =>
              handleFetchMore(distanceFromEnd)
            }
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
