import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';

import ProfileContext from '../contexts/ProfileContext';
import ProductCardTertiary from '../components/ProductCardTertiary';

import { ProductProps } from '../contexts/ProductContext';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type Props = {
  item: ProductProps;
  navigation: MenuScreenNavigationProp;
};

type CartItemsProps = {
  cartItems: ProductProps[];
};

export function Cart({ item, navigation }: Props) {
  const { ...profile } = useContext(ProfileContext);
  const [cartItems, setCartItems] = useState<ProductProps[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TopBar profile={profile} />
        <Text style={styles.text}>Carrinho</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <ProductCardTertiary
              data={item}
              // onPress={() => handlePlantCarSelected(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          onEndReachedThreshold={0.1}
          // onEndReached={({ distanceFromEnd }) =>
          //   handleFetchMore(distanceFromEnd)
          // }
          // ListFooterComponent={
          // //  <BottomBar />
          //   //loadingMore ? <ActivityIndicator color={'green'} /> : <></>
          // }
        ></FlatList>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.bottomText}>Total dos Itens</Text>
          <Text style={styles.bottomText}>R$ 60,00</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.bottomText}>Frete</Text>
          <Text style={styles.bottomText}>R$ 10,00</Text>
        </View>

        <View
          style={{
            //flex: 1,
            //width: '100%',
            height: 1,
            backgroundColor: 'rgba(33, 33, 33, 0.08)',
            marginHorizontal: 12,
          }}
        ></View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>Total da Compra</Text>
          <Text style={styles.text}>R$ 10,00</Text>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>FINALIZAR</Text>
        </TouchableOpacity>

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
  text: {
    //flex: 1,
    marginHorizontal: 12,
    marginTop: 15,
    color: '#005723',
    alignItems: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  bottomText: {
    //flex: 1,
    marginHorizontal: 12,
    color: 'rgba(0, 0, 0, 0.38)',
    alignItems: 'flex-start',
    fontSize: 15,
    fontWeight: '500',
  },
  productsCard: {
    flex: 1,
    //padding: 10,
  },
  button: {
    // position: 'absolute',
    //width: '70%',
    height: 60,
    marginHorizontal: 12,
    //   left: 64,
    //   top: 450,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#FF8108',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    //flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
