import React from 'react';

import { Text, StyleSheet, Image, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { ProductProps } from '../pages/Menu';

//import colors from '../styles/colors';
//import fonts from '../styles/fonts';

export interface ProductsProps extends RectButtonProps {
  data: ProductProps;
}
export const ProductCardTertiary = ({ data, ...rest }: ProductsProps) => {
  const formatReal = (value: number) => {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  return (
    <RectButton style={styles.container} key={data._id}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.verticalBar}></View>
      <Text>{data.name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(33, 33, 33, 0.08)',
    borderRadius: 5,
    margin: 5,
    paddingHorizontal: 5,
  },
  verticalBar: {
    height: 80,
    width: 2,
    backgroundColor: 'rgba(0, 87, 35, 0.2)',
    position: 'absolute',
    marginLeft: 150,
  },
  text: {
    //alignContent: 'flex-start',
    // color: colors.green_dark,
    // fontFamily: fonts.heading,
    //marginVertical: 16,
  },
  rect: {
    //maxWidth: '45%',
    //paddingVertical: 10,
    //backgroundColor: 'red',
    //justifyContent: 'flex-end',
    //margin: 10,
    //marginHorizontal: 5,
  },

  image: {
    //flex: 1,
    width: 100,
    height: 100,
    //resizeMode: 'contain',
  },
});

export default ProductCardTertiary;
