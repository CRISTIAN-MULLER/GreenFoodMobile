import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import * as AuthSession from 'expo-auth-session';

import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

import AuthContext from '../contexts/AuthContext';

import LogoSVG from '../../assets/LogoSVG';
import Gradient from '../components/Gradient';
import api from '../services/api';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

export function Login({ navigation }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [password, setPassword] = useState('123456');
  const [email, setEmail] = useState<string>('muller.cristian@outlook.com');
  const [show, setShow] = useState(false);

  const handleSignIn = async (source: string) => {
    if (source === 'google') {
      const CLIENT_ID =
        '174198411470-5ni1ito2uvhmkp7shqlmh5ooiiepjt25.apps.googleusercontent.com';
      const REDIRECT_URI =
        'https://auth.expo.io/@cristian.muller/greenfoodmobile';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      if (type === 'success') {
        navigation.navigate('Menu', {
          token: params.access_token,
        });
      }
    }

    if (source === 'login') {
      await api
        .post(`login`, {
          source,
          email,
          password,
        })
        .then(() => {
          navigation.navigate('Menu', { token: '' });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Gradient />

        <View style={{ marginBottom: 20 }}>
          <LogoSVG width="170" height="150" />
        </View>
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
              <Ionicons
                name="eye"
                size={24}
                color="rgba(0, 0, 0, 0.38)"
                style={{ marginRight: 5 }}
              />
            }
            customHidePasswordComponent={
              <Ionicons
                name="eye-off"
                size={24}
                color="rgba(0, 0, 0, 0.38)"
                style={{ marginRight: 5 }}
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
              color: 'red',
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
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => handleSignIn('login')}
        >
          <Text style={styles.text}>ENTRAR</Text>
        </TouchableOpacity>
        <Text style={styles.white}>
          Esqueceu a senha? <Text style={styles.underscore}>Lembrar</Text>
        </Text>
        <Text style={styles.white}>
          Ainda não tem cadastro?
          <Pressable onPress={() => navigation.navigate('User')}>
            <Text style={styles.underscore}>Faça Agora</Text>
          </Pressable>
        </Text>

        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: '#F9E0B366' }} />
          <View>
            <Text style={{ width: 40, textAlign: 'center', color: '#FFFFFF' }}>
              Ou
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#F9E0B366',
            }}
          />
        </View>

        <Text style={styles.white}>Entre com</Text>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginBottom: '15%',
          }}
        >
          <AntDesign
            name="google"
            size={36}
            color="#FFFFFF"
            onPress={() => handleSignIn('google')}
          />
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,

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

  white: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  underscore: {
    color: '#FF8108',
    textDecorationLine: 'underline',
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
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
