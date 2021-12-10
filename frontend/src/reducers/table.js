const initialState = {
    table: null,
    tableItems: [],
    tableType: null
}


export default function table(state = initialState, action){
    switch(action.type){
        case "SET_TABLE":
            return({...state, table: action.payload})
        case "SET_TABLE_TYPE":
            return({...state, tableType: action.payload})
        case "SET_TABLE_ITEMS":
            return({...state, tableItems: action.payload})
        default:
            return state;
    }
}