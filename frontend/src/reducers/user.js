const initialState = {
    userName: false,
    userActive: false,
    userImg: "",
    userPassword: []
}
export default function(state = initialState, action){
    switch(action.type){
        case "USER_NAME":
            return {...state, userName: action.payload};
        case "USER_ACTIVE":
            return {...state, userActive: action.payload};
        case "USER_PASSWORD":
            return {...state, userPassword: action.payload};
        case "USER_IMG":
            return {...state, userImg: action.payload};
        case "USER_LOGOUT":
            return {...state, ...initialState};
        default:
            return state;
    }
}