import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import NumericInput from 'react-native-numeric-input';

import { ProductProps, SaleUnitProps } from '../contexts/ProductContext';
import { CartContext, CartItemContext } from '../contexts/CartContext';

type ProductCardSecondaryProps = {
  // show: boolean;
  data: ProductProps;
};

export const ProductCardSecondary = ({ data }: ProductCardSecondaryProps) => {
  let {
    handleAddToCart,
    setSaleUnit,
    saleUnit,
    cart,
    setItemTotalQty,
    itemTotalQty,
  } = useContext(CartContext);

  const formatReal = (value: number | bigint) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  const saleUnitSelection = (id: any) => {
    const selectedSaleUnit = data.saleUnits.find(
      (saleUnit) => saleUnit._id == id
    );
    setSaleUnit(selectedSaleUnit!);
  };

  const addItemToCart = () => {
    data.saleUnit = saleUnit;
    //setSaleUnit(data.saleUnit);
    // const item = { item: data, itemsTotalQty: itemsTotalQty };
    // setCartItems(item);
    //handleAddToCart(cartItems);
    console.log('items do carro', cart);
    //handleAddToCart(cartItems);
  };

  const handleCartItems = () => {};

  useEffect(() => {
    // setItemsTotalQty(1);
    data.saleUnit = data.saleUnits[0];
    data.itemTotalQty = 1;
    setSaleUnit(data.saleUnit);
    //cart = { items: [data], itemsTotalQty: 1 };
    //handleAddToCart(cartItems);
    console.log('iniciou carrinho', cart, 'oi', data);
  }, []);

  useEffect(() => {
    console.log('mudou carrinho', cart);
  }, [cart]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={{ uri: data.image }} style={styles.image} />
        <View style={styles.card}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            {data.name}
          </Text>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              color: 'rgba(0, 0, 0, 0.38)',
            }}
          >
            {formatReal(saleUnit!.price)} / {saleUnit!.saleUnit}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.text}>Selecione</Text>
          <View style={styles.picker}>
            <Picker
              style={styles.picker}
              selectedValue={saleUnit!._id}
              onValueChange={(itemValue) => saleUnitSelection(itemValue)}
              mode="dropdown"
            >
              {data.saleUnits.map((saleUnit, index) => {
                return (
                  <Picker.Item
                    label={saleUnit.saleUnit}
                    value={saleUnit._id}
                    key={saleUnit._id}
                  />
                );
              })}
            </Picker>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.text}>Quantidade</Text>
          <NumericInput
            onChange={(value) => {
              setItemTotalQty(value);
            }}
            totalWidth={100}
            totalHeight={40}
            valueType="real"
            minValue={0.1}
            initValue={1}
            step={1}
            rounded
            textColor="rgba(0, 0, 0, 0.6)"
            rightButtonBackgroundColor="#FFFFFF"
            leftButtonBackgroundColor="#FFFFFF"
            separatorWidth={0}
          />
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'rgba(33, 33, 33, 0.08)',
          }}
        />

        <View style={styles.card}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>R$ 19,90</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => addItemToCart()}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wrapper: {
    backgroundColor: '#FFFFFF',
    height: 400,
    width: 300,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  image: {
    flex: 1,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 18,
    marginRight: 10,
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    height: 40,
    width: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B8B8B9',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF8108',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  total: {
    color: '#005723',
    fontSize: 18,
    marginRight: 10,
    fontWeight: '700',
  },
});
