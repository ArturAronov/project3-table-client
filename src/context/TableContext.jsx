import { createContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import tableReducer from './tableReducer';
import axios from 'axios';
import _ from 'lodash';

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const navigate = useNavigate();
  const initialState = {
    login: false,
    authType: '',
    profile: {},
    restaurants: [],
    restaurantInfo: {},
    bookings: [],
    availableTimeslots: [],
    maxCapacity: 0,
  };
  axios.defaults.withCredentials = true
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const test = (id, data) => {
    axios
      .post(`http://localhost:5000/api/user/booking/${id}`, data)
      .catch((err) => console.log(err))
  }

  const getAvailableTimeslots = (id, covers, date, month, year) => {
    return axios.get(`http://localhost:5000/api/timeslots/${id}/${covers}/${date}/${month}/${year}`)
    .then(res => {
      // http://localhost:5000/api/timeslots/${id}/${covers}/${date}/${month}/${year}`
      // http://localhost:5000/api/timeslots/95a69d50-7907-4ac6-83fc-f285d14d310c/2/23/July/2022
      dispatch({
        type: 'TIMESLOTS',
        availableTimeslots: res.data.tablesAvailable,
        maxCapacity: res.data.tableMax
      });
    });
  };

  const getUserBookings = () => {
    axios.get('http://localhost:5000/api/user/bookings', {withCredentials: true})
      .then(res => {
        dispatch({
          type: 'GET_USER_BOOKINGS',
          bookings: res.data
        });
      });
  };

  const getProfile = () => {
    axios.get('http://localhost:5000/api/profile', {withCredentials: true})
      .then(res => {
        dispatch({
          type: 'AUTH',
          profile: _.omit(res.data, ['id', 'authType']),
          authType: res.data.authType,
          login: true,
        })
      })
  };

  const getRestaurants = () => {
    axios.get('http://localhost:5000/api/restaurants').then(res => {
      dispatch({
        type: 'GET_RESTAURANTS',
        restaurants: res.data
      });
    });
  };

  const getRestaurantInfo = id => {
    axios.get(`http://localhost:5000/api/restaurant/${id}`).then(res => {
      dispatch({
        type: 'GET_RESTAURANT_INFO',
        restaurantInfo: res.data
      });
    })
  };

  const profileArray = () => {
    const tempArr = []
    for(let i in state.profile) {
      // Change the key from ie firstName to first Name
      const removeCamelCase = i.split('').map(letter => {
        return letter === letter.toUpperCase() ? ` ${letter}` : letter
      }).join('');

      // Capitalize key's first letter
      const capitalizeFirstLetter = removeCamelCase.charAt(0).toUpperCase() + removeCamelCase.slice(1);

      tempArr.push({[capitalizeFirstLetter]: state.profile[i]});
    };

    return tempArr;
  };

  const updateUserProfile = data => {
    axios.put('http://localhost:5000/api/user/profile/update', data, {withCredentials: true}).then(() => navigate('/user/profile'))
  };

  const updateRestaurantProfile = data => {
    axios.put('http://localhost:5000/api/business/profile/update', data, {withCredentials: true}).then(() => navigate('/business/profile'))
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
            authType: 'restaurant',
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
        profile: {},
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
      getRestaurants,
      updateUserProfile,
      profileArray,
      getUserBookings,
      getRestaurantInfo,
      updateRestaurantProfile,
      getAvailableTimeslots,
      test,
    }}
    >
      {children}
    </TableContext.Provider>
};

export default TableContext
