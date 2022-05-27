const defaultState = { user: null, accessToken: null };

const credentialsReducer = (state = defaultState, action) => {
   switch (action.type) {
      case 'SET_AUTH': return { ...state, user: action.user, accessToken: action.accessToken };
      case 'LOGOUT': return { ...state, ...defaultState };
    default: return state
   }
}

export default credentialsReducer;