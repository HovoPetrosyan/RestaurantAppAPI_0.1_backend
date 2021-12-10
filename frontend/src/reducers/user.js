const initialState = {
    userName: "Օգտանուն",
}


export default function user(state = initialState, action){
    switch(action.type){
        case "SET_USER_NAME":
            return({...state, userName: action.payload})
        default:
            return state;
    }
}