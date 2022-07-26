const tableReducer = (state, action) => {
  switch(action.type) {
    case 'AUTH':
      return {
        ...state,
        profile: action.profile,
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

    case 'GET_RESTAURANT_INFO':
      return {
        ...state,
        restaurantInfo: action.restaurantInfo
      }

    case 'TIMESLOTS':
      return {
        ...state,
        availableTimeslots: action.availableTimeslots,
        maxCapacity: action.maxCapacity
      }

    case 'GET_TABLES':
      return {
        ...state,
        tables: action.tables,
      }

    case 'GET_RESTAURANT_BOOKINGS':
      return {
        ...state,
        restaurantBookings: action.restaurantBookings,
      }

    default:
      return state
  };
};

export default tableReducer;
