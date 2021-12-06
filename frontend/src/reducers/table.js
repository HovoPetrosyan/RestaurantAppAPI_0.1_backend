const initialState = {
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    count: 0,
    orderNumber: false,
    orderItems: {}
}
export default function(state = initialState, action){
    switch(action.type){
        case "TORIGHT":
            return{...state, count: state.count+1}
        case "TOLEFT":
            return{...state, count: state.count-1}
        case "ORDER_NUMBER":
            return{...state, orderNumber: action.payload}
        case "UPDATE_ORDER_COUNT":
            return{...state, orderItems: action.payload}
        default:
            return state
    }
}