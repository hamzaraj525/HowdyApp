const initialState = {
  cartItems: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {...state, cartItems: state.cartItems.concat(action.payload)};
    case 'REMOVE_FROM_CART':
      return cartItems.filter(
        cartItems => cartItems.key !== action.payload.key,
      );
  }
  return state;
};
export default cartReducer;
