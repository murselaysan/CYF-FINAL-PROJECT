// see https://usehooks.com/useAuth/
// and https://reactrouter.com/web/example/auth-workflow
import { useState, useEffect, useContext, createContext } from 'react';
import useLocalStorage from './useLocalstorage';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [, setToken] = useLocalStorage('token', '');
  
  const signin = (email, password, cb) => {
    return fetch(`${process.env.REACT_APP_URL}/auth/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { token, user: { name,id } } = data;
        console.log(data);
        setToken(token);
        setUser({  token, name, id });
        cb();
      });
  };

  const signup = (name, email, password, password2, cb) => {
    return fetch(`${process.env.REACT_APP_URL}/auth/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, password2, name }),
    })
      .then((res) => res.json())
      .then((data) => {
        const {
          token,
          user: { name },
        } = data;
        setToken(token);
        setUser({ token, name });
        cb();
      });
  };

  const signout = (cb) => {
    setToken('');
    setUser(false);
    cb();
    return false;
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    fetch(`${process.env.REACT_APP_URL}/auth/token`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          const {
            token,
            user: { name,id },
          } = data;
          setUser({ token, name ,id});
        }
      });
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
  };
}