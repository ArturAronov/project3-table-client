const tableReducer = (state, action) => {
  switch(action.type) {
    case 'AUTH':
      return {
        ...state,
        data: action.data,
        authType: action.authType,
        login: action.login,
      }

    case 'GET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.restaurants
      }

    case 'GET_USER_BOOKINGS':
      return {
        ...state,
        bookings: action.bookings
      }

    default:
      return state
  };
};

export default tableReducer;
