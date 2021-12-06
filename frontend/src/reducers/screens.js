const initialState = {
    bill: "",
    order: false,
    user: false,
    pay: false,
    edit: false,
    removeLine: false,
    addProduct: false,
    payDone: false,
    userChange: false,

}
export default function(state = initialState, action){
    switch(action.type){
        case "BILL":
            return{...state, bill: action.payload}
        case "ORDER":
            return{...state, order: action.payload}
        case "USER":
            return{...state, user: action.payload}
        case "PAY":
            return {...state, pay: action.payload};
        case "EDIT":
            return {...state, edit: action.payload}; 
        case "REMOVE_LINE":
            return {...state, removeLine: action.payload}; 
        case "ADD_PRODUCT":
            return {...state, addProduct: action.payload};
        case "PAY_DONE":
            return {...state, payDone: action.payload}; 
        case "USER_CHANGE":
            return {...state, userChange: action.payload};
        default:
            return state
    }
}