const tableReducer = (state, action) => {
  switch(action.type) {
    case 'AUTH':
      return {
        ...state,
        data: action.data,
        authType: action.authType,
        login: action.login,
      }

    default:
      return state
  };
};

export default tableReducer;
