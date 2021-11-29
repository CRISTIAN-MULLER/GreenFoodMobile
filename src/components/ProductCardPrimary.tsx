import React from 'react';

import { Text, StyleSheet, Image, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

//import colors from '../styles/colors';
//import fonts from '../styles/fonts';

export interface ProductProps extends RectButtonProps {
  data: {
    _id: { $oid: string };
    name: string;
    image: string;
    saleUnits: [
      {
        _id: { $oid: string };
        saleUnit: string;
        price: { $numberDouble: number };
        active: boolean;
      }
    ];
  };
}
export const PlantCardPrimary = ({ data, ...rest }: ProductProps) => {
  const formatReal = (value) => {
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
                <>
                  <Text
                    key={saleUnit._id.$oid}
                    style={
                      index === data.saleUnits.length - 1
                        ? styles.saleUnitLastChild
                        : styles.saleUnit
                    }
                  >
                    {formatReal(saleUnit.price)}
                    <Text style={{ color: 'red' }}> {saleUnit.saleUnit}</Text>
                  </Text>
                </>
              );
            })}
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome name="plus" size={16} color="#FF8108" />
          </View>
        </View>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //maxWidth: '45%',
    //backgroundColor: 'red',
    // paddingVertical: 10,
    //alignItems: 'center',
    // margin: 10,
    // width: '100%',
    // height: '100%',
    // resizeMode: 'cover',[~´]=
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(33, 33, 33, 0.08)',
    borderRadius: 5,
    margin: 5,
    justifyContent: 'space-between',
  },
  text: {
    alignContent: 'flex-start',
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
    marginHorizontal: 5,
  },

  image: {
    flex: 1,
    width: 160,
    height: 160,
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
    height: 24,
    width: 24,
    marginBottom: -5,
    marginRight: -5,
    borderBottomRightRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlantCardPrimary;
