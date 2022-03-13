import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FloatingLabelInput } from 'react-native-floating-label-input';

import LogoSVG from '../../assets/LogoSVG';
import Gradient from '../components/Gradient';
import { RootStackParamList } from '../types/RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
  navigation: UserScreenNavigationProp;
};

export function User({ navigation }: Props) {
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
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

        <View style={{ marginBottom: 20 }}>
          <LogoSVG width="170" height="150" />
        </View>
        <View style={styles.userInputs}>
          <Text style={styles.text}>Nome</Text>
          <FloatingLabelInput
            leftComponent={
              <Ionicons
                name="person"
                size={24}
                color="rgba(0, 0, 0, 0.6)"
                style={{ marginLeft: 10 }}
              />
            }
            value={name}
            containerStyles={styles.textInput}
            inputStyles={{
              color: '#313130',
              paddingHorizontal: 10,
            }}
            onChangeText={(name) => setName(name)}
            label={''}
          />
          <Text style={styles.text}>E-mail</Text>
          <FloatingLabelInput
            leftComponent={
              <MaterialIcons
                name="email"
                size={24}
                color="rgba(0, 0, 0, 0.6)"
                style={{ marginLeft: 10 }}
              />
            }
            keyboardType="email-address"
            value={email}
            containerStyles={styles.textInput}
            inputStyles={{
              color: '#313130',
              paddingHorizontal: 10,
            }}
            onChangeText={(value) => setEmail(value)}
            label={''}
          />

          <Text style={styles.text}>Senha</Text>
          <FloatingLabelInput
            leftComponent={
              <MaterialIcons
                name="lock"
                size={24}
                color="rgba(0, 0, 0, 0.6)"
                style={{ marginLeft: 10 }}
              />
            }
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
            containerStyles={styles.textInput}
            inputStyles={{
              color: '#313130',
              paddingHorizontal: 10,
            }}
            onChangeText={(value) => setPassword(value)}
            label={''}
          />

          <Text style={styles.text}>Confirmar senha</Text>
          <FloatingLabelInput
            leftComponent={
              <MaterialIcons
                name="lock"
                size={24}
                color="rgba(0, 0, 0, 0.6)"
                style={{ marginLeft: 10 }}
              />
            }
            value={confirmationPassword}
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
            containerStyles={styles.textInput}
            inputStyles={{
              color: '#313130',
              paddingHorizontal: 10,
            }}
            onChangeText={(value) => setConfirmationPassword(value)}
            label={''}
          />

          <Text style={styles.text}>Telefone</Text>
          <FloatingLabelInput
            leftComponent={
              <MaterialIcons
                name="phone"
                size={24}
                color="rgba(0, 0, 0, 0.6)"
                style={{ marginLeft: 10 }}
              />
            }
            keyboardType="phone-pad"
            staticLabel
            label={''}
            value={phone}
            hintTextColor={'#aaa'}
            mask="(99) 99999-9999"
            hint="(  ) _____-____"
            containerStyles={styles.textInput}
            onChangeText={(value) => {
              setPhone(value);
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.text}>CADASTRAR</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 12,
  },

  userInputs: {
    width: '100%',
  },

  text: {
    marginBottom: 5,
    fontWeight: '600',
    color: 'white',
  },

  textInput: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 44,
    borderRadius: 4,
    //padding: 5,
    //textAlign: 'center',
  },
  button: {
    // position: 'absolute',
    width: '100%',
    height: '7%',
    //   left: 64,
    //   top: 450,
    backgroundColor: '#FF8108',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
});
