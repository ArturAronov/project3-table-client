const tableReducer = (state, action) => {
  switch(action.type) {
    case 'AUTH':
      return {
        ...state,
        id: action.id,
        data: action.data,
        authType: action.authType,
        login: action.login,
      }

    default:
      return state
  };
};

export default tableReducer;
