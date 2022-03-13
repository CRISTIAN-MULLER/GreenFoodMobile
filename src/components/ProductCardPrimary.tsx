import React, { useContext, useState } from 'react';

import { Text, StyleSheet, Image, View, Modal } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import api from '../services/api';

import { ProductCardSecondary } from './ProductCardSecondary';

import { ProductProps, SaleUnitProps } from '../contexts/ProductContext';
import { CartContext, CartItemContext } from '../contexts/CartContext';

export interface ProductsProps extends RectButtonProps {
  data: ProductProps;
}

export const ProductCardPrimary = ({ data, ...rest }: ProductsProps) => {
  const {
    handleAddToCart,
    setSaleUnit,
    setCartItems,
    cartItems,
    saleUnit,
    setItemTotalQty,
    itemTotalQty,
  } = useContext(CartContext);

  const [showAddToCatProduct, setShowAddToCatProduct] =
    useState<boolean>(false);

  const formatReal = (value: number | bigint) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  return (
    <View style={styles.container}>
      <RectButton style={styles.rect} {...rest}>
        <Image source={{ uri: data.image }} style={styles.image} />
        {/* <SvgFromUri uri={imageSrc} height={70} width={70} /> */}
        <Text>{data.name}</Text>
        <View style={styles.priceView}>
          <View style={{ flexDirection: 'column' }}>
            {data.saleUnits.map((saleUnit, index) => {
              return (
                <View key={saleUnit._id}>
                  <Text
                    style={
                      index === data.saleUnits.length - 1
                        ? styles.saleUnitLastChild
                        : styles.saleUnit
                    }
                  >
                    {formatReal(saleUnit.price)}
                    <Text style={{ color: 'red' }}> {saleUnit.saleUnit}</Text>
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome
              name="plus"
              size={24}
              color="#FF8108"
              onPress={() => setShowAddToCatProduct(!showAddToCatProduct)}
            />
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAddToCatProduct}
          onRequestClose={() => {
            setCartItems({} as CartItemContext);
            setSaleUnit({} as SaleUnitProps);
            setItemTotalQty(0);
            setShowAddToCatProduct(!showAddToCatProduct);
          }}
        >
          <ProductCardSecondary data={data} />
        </Modal>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(33, 33, 33, 0.08)',
    borderRadius: 5,
    margin: 5,
    justifyContent: 'space-between',
  },
  text: {
    alignContent: 'flex-start',
  },
  rect: {
    marginHorizontal: 5,
  },

  image: {
    flex: 1,
    width: 150,
    height: 130,
    resizeMode: 'contain',
  },
  saleUnit: {
    flex: 1,
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.38)',
  },

  saleUnitLastChild: {
    flex: 1,
    marginTop: 5,
    color: 'rgba(0, 0, 0, 0.87)',
  },

  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  iconContainer: {
    backgroundColor: '#1E9C25',
    height: 36,
    width: 36,
    marginBottom: -5,
    marginRight: -5,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductCardPrimary;
