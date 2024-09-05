const initialState = {
    lastFuelPrice: null,
    lastFullServicePrice: null
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_LAST_FUEL_PRICE':
        return { ...state, lastFuelPrice: action.payload };
      case 'SET_LAST_FULL_SERVICE_PRICE':
        return { ...state, lastFullServicePrice: action.payload };
      default:
        return state;
    }
  }