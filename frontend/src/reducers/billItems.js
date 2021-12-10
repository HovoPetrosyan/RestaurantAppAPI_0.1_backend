const initialState = {}

export default function billItems(state = initialState, action){
    switch(action.type){
        case "SET_BILL_ITEMS":
            return(action.payload)
        default:
            return state;
    }
}