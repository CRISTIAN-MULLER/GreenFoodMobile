import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { FloatingLabelInput } from 'react-native-floating-label-input';

import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

import LogoSVG from '../../assets/logo';
import Gradient from './Gradient';

export function Login() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState<string>();
  const [show, setShow] = useState(false);

  // function handleInputBlur() {
  //   setIsFocused(false);
  //   setIsFilled(!!name);
  // }

  // function handleInputFocus() {
  //   setIsFocused(true);
  // }
  // function handleInputChange(value: string) {
  //   setIsFilled(!!value);
  //   setName(value);
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Gradient />

        <LogoSVG />

        <View style={styles.login}>
          <Text style={styles.textLogin}>LOGIN</Text>
          <FloatingLabelInput
            label="E-mail"
            value={email}
            staticLabel
            containerStyles={{
              margin: 5,
              height: 50,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderRadius: 4,
              alignItems: 'center',
            }}
            labelStyles={{
              backgroundColor: '#FFF8EC',
              padding: 2,
            }}
            customLabelStyles={{
              fontSizeFocused: 16,
            }}
            inputStyles={{
              color: '#313130',
              paddingHorizontal: 10,
            }}
            onChangeText={(value) => {
              setEmail(value);
            }}
          />

          <FloatingLabelInput
            label="Senha"
            value={password}
            isPassword
            togglePassword={show}
            customShowPasswordComponent={
              <Ionicons name="eye" size={24} color="black" />
            }
            customHidePasswordComponent={
              <Ionicons
                name="eye-off"
                size={24}
                color="black"
                margiRight={10}
              />
            }
            staticLabel
            containerStyles={{
              margin: 5,
              height: 50,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderRadius: 4,
              alignItems: 'center',
            }}
            labelStyles={{
              backgroundColor: '#FFF8EC',
              padding: 2,
            }}
            customLabelStyles={{
              fontSizeFocused: 16,
            }}
            inputStyles={{
              color: '#313130',
              paddingHorizontal: 10,
            }}
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.text}>ENTRAR</Text>
        </TouchableOpacity>
        <Text>Esqueceu a senha? Lembrar</Text>
        <Text>Ainda não tem cadastro? Faça Agora</Text>

        <View
          style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: '#F9E0B366' }} />
          <View>
            <Text style={{ width: 40, textAlign: 'center' }}>Ou</Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#F9E0B366',
            }}
          />
        </View>

        <Text>Entre com</Text>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10%',
          }}
        >
          <AntDesign name="google" size={36} color="#FFFFFF" />
          <Entypo name="facebook-with-circle" size={36} color="#FFFFFF" />
        </View>
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
  },
  logoView: {
    width: '70%',
  },
  login: {
    backgroundColor: '#FFF8EC',
    padding: 10,
    width: '70%',

    //  height: '40%',
  },
  textLogin: {
    fontSize: 15,
    fontWeight: '700',
    color: '#247D27',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  fieldSet: {
    margin: 10,
    height: 40,
    // paddingHorizontal: 10,
    // paddingBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
    alignItems: 'center',
  },
  legend: {
    position: 'absolute',
    top: -10,
    left: 10,
    color: 'rgba(0, 0, 0, 0.6)',
    //fontWeight: 'bold',
    //backgroundColor: '#FFFFFF',
  },

  input: {
    borderWidth: 2,
    borderColor: '#FF8108',
    //color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
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
