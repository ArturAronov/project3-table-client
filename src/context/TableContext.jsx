import { createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import tableReducer from './tableReducer';
import axios from 'axios';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const initialState = {
    login: false,
    authType: '',
    data: {},
  };

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(tableReducer, initialState);

  const getProfile = () => {
    axios.get('http://localhost:5000/api/profile', {withCredentials: true})
      .then(data => {
        console.log(data.data)
        dispatch({
          type: 'AUTH',
          payload: data.data,
          authType: data.data.authType,
          login: true,
        })
      })
  };

  const authUserLogin = data => {
    axios.post(
          'http://localhost:5000/api/user/auth/login',
          data,
          {withCredentials: true}
        )
        .then(data =>
          dispatch({
            type: 'AUTH',
            payload: data.data,
            authType: 'user',
            login: true,
          }),
          console.log(data.data)
        )
        .then(navigate('/restaurants'))
  };

  const authBusinessLogin = data => {
    axios.post(
          'http://localhost:5000/api/business/auth/login',
          data,
          {withCredentials: true}
        )
        .then(data => {
          dispatch({
            type: 'AUTH',
            payload: data.data,
            authType: 'business',
            login: true,
          })
          console.log(data.data)
        })
        .then(navigate('/restaurants'))
  };

  const authLogout = () => {
    axios.delete('http://localhost:5000/api/auth/logout', {withCredentials: true}).then(() => {
      dispatch({
        type: 'AUTH',
        login: false,
        authType: '',
        data: {},
      })
    })
    .then(navigate('/'));
  };

  return <TableContext.Provider
    value = {{
      ...state,
      authUserLogin,
      authBusinessLogin,
      authLogout,
      getProfile
    }}
    >
      {children}
    </TableContext.Provider>
};

export default TableContext
