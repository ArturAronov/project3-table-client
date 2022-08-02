import { createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import tableReducer from './tableReducer';
import axios from 'axios';
import _ from 'lodash';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const initialState = {
    id: '',
    login: false,
    authType: '',
    data: {},
  };

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(tableReducer, initialState);

  const getProfile = () => {
    axios.get('http://localhost:5000/api/profile', {withCredentials: true})
      .then(resp => {
        dispatch({
          type: 'AUTH',
          id: resp.data.id,
          data: _.omit(resp.data, ['authType']),
          authType: resp.data.authType,
          login: true,
        })
      })
  };

  const updateUserProfile = data => {
    axios.put('http://localhost:5000/api/user/profile/update', data, {withCredentials: true}).then(() => navigate('/user/profile'))
  };

  const authUserLogin = data => {
    axios.post(
          'http://localhost:5000/api/user/auth/login',
          data,
          {withCredentials: true}
        )
        .then(resp =>
          dispatch({
            type: 'AUTH',
            payload: resp.data,
            authType: 'user',
            login: true,
          }),
        )
        .then(navigate('/restaurants'))
  };

  const authBusinessLogin = data => {
    axios.post(
          'http://localhost:5000/api/business/auth/login',
          data,
          {withCredentials: true}
        )
        .then(resp => {
          dispatch({
            type: 'AUTH',
            payload: resp.data,
            authType: 'business',
            login: true,
          })
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
      getProfile,
      updateUserProfile,
    }}
    >
      {children}
    </TableContext.Provider>
};

export default TableContext
