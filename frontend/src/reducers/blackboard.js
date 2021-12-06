const initialState = {
    hall: "",
    tableNumber: "",
    title: "",
}

export default function(state = initialState, action){
    switch(action.type){
        case "HALL":
            return {...state, hall: action.payload};
        case "TITLE":
            return {...state, title: action.payload};
        case "TABLE_NAME":
            return {...state, tableNumber: action.payload};
        default:
            return state;
    }
}