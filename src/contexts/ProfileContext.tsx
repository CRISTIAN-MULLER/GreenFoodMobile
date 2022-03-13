import { createContext } from 'react';

const ProfileContext = createContext({
  email: 'email',
  family_name: 'family',
  given_name: 'given',
  locale: 'locale',
  name: 'name',
  picture: 'picture',
});

export default ProfileContext;
