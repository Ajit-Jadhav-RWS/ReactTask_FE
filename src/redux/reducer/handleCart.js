/* eslint-disable default-case */
/* eslint-disable no-unreachable */
const cart =[];
const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADD_ITEM":
      const exist = state.find((e) => e.id === product.id);
      if (exist) {
        return state.map((e) =>
          e.id === product.id ? { ...e, qty: e.qty + 1 } : e
        );
      } else {
        return [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }
    case "DELETE_ITEM":
      const exist1 = state.find((e) => e.id === product.id);
      if (exist1.qty === 1) {
        return state.filter((e) => e.id !== exist1.id);
      } else {
        return state.map((e) =>
          e.id === product.id ? { ...e, qty: e.qty - 1 } : e
        );
      }

    default:
      return state;
  }
};
export default handleCart;
