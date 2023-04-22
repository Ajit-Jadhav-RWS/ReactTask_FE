export const addCart = (total) => {
    return {
        type: "ADD_ITEM",
        payload:total
    }
}
export const deleteCart = (total) => {
    return {
        type: "DELETE_ITEM",
        payload:total
    }
}

