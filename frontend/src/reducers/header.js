const initialState = {
    hall: "",
    table: "",
    title: "",
    users: []
}

export default function header(state = initialState, action){
    switch(action.type){
        case "HEADER_HALL":
            return({...state, hall: action.payload})
        case "HEADER_TABLE":
            return({...state, table: action.payload})
        case "HEADER_TITLE":
            return({...state, title: action.payload})
        case "SET_HEADER_USERS":
            return({...state, users: action.payload})
        default:
            return state;
    }
}