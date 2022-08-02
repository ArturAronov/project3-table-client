import { createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import tableReducer from './tableReducer';
import axios from 'axios';
import _ from 'lodash';

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
      .then(resp => {
        dispatch({
          type: 'AUTH',
          data: _.omit(resp.data, ['id', 'authType']),
          authType: resp.data.authType,
          login: true,
        })
      })
  };

  const profileArray = () => {
    const tempArr = []
    for(let i in state.data) {
      // Change the key from ie firstName to first Name
      const removeCamelCase = i.split('').map(letter => {
        return letter === letter.toUpperCase() ? ` ${letter}` : letter
      }).join('');

      // Capitalize key's first letter
      const capitalizeFirstLetter = removeCamelCase.charAt(0).toUpperCase() + removeCamelCase.slice(1);

      tempArr.push({[capitalizeFirstLetter]: state.data[i]});
    };

    return tempArr;
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
      profileArray,
    }}
    >
      {children}
    </TableContext.Provider>
};

export default TableContext
