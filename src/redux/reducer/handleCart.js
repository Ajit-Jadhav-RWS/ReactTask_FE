/* eslint-disable default-case */
/* eslint-disable no-unreachable */
const cart =0;
const handleCart = (state = cart, action) => {
  const total = action.payload;
  switch (action.type) {
    case "ADD_ITEM": return state=total
    case "DELETE_ITEM": return state=total
    default:
      return state;
  }
};
export default handleCart;
