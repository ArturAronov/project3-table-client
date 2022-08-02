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
        restaurants: action.restaurants
      }

    default:
      return state
  };
};

export default tableReducer;
