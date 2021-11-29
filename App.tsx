import React from 'react';
import { Platform } from 'react-native';

import Routes from './src/routes';
if (Platform.OS === 'android') {
  // only Android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/pt-BR'); // load the required locale details
}
export default function App() {
  return <Routes />;
}
