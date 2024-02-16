import {createContext, useState, ReactNode, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

interface GlobalAuthenticationProviderProp {
  children: ReactNode;
}

type User = {
  email: string;
  fullname: string;
  password: string;
  token: string;
};

export interface GlobalAuthenticationContextType {
  token: string | null;
  Logout: () => void;
  Login: (email: string, password: string) => void;
  loginError: string;
  visible: boolean;
  onClose: () => void;
}

export const GlobalAthentication =
  createContext<GlobalAuthenticationContextType>();

const GlobalAuthenticationProvider = ({
  children,
}: GlobalAuthenticationProviderProp) => {
  const [token, setToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState('');
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(!visible)
  }

  const Login = (email: string, password: string) => {
    if (email == '' || password == '') {
      setVisible(!visible);
      setLoginError('Every field is required!');
    } else {
      firestore()
        .collection('Signup Users')
        .get()
        .then(querySnapshot => {
          console.log('Total users: ', querySnapshot.size);
          let data: any = [];

          querySnapshot.forEach(documentSnapshot => {
            data.push(documentSnapshot.data());
          });

          let userExists = data.some((user: User) => {
            return user.email == email && user.password == password;
          });

          if (userExists) {
            data.filter((user: User) => {
              if (user.email == email && user.password == password) {
                setToken(user.token);
                AsyncStorage.setItem('token', user.token);
                AsyncStorage.setItem('fullname', user.fullname);
              }
            });
          } else {
            setLoginError('User account not found!');
            setVisible(!visible);
          }
        });
    }
  };

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.log('deleting login token', error);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    getToken();
  }, [Logout]);

  return (
    <GlobalAthentication.Provider
      value={{token, Logout, Login, loginError, visible, onClose}}>
      {children}
    </GlobalAthentication.Provider>
  );
};

export default GlobalAuthenticationProvider;
