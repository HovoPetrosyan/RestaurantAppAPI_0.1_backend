const initialState = {
    checked: {
        name: "",
        amount: "",
        price: "",
        result: ""
    },
}

export default function checked(state = initialState, action){
    switch(action.type){
        case "SET_CHECKED":
            return({...state, checked: action.payload});
        case "SET_CHECKED_DEFAULT":
            return(initialState);
        default:
            return state;
    }
}