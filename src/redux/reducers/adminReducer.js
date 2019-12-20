const defaultState = false;

function adminReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_ADMIN': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

export default adminReducer;
