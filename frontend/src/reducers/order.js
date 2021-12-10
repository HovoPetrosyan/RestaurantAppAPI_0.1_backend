const initialState = {
    kod_1c: "",
    id: null,
    title: "",
    price: "",
    category_name: ""
}


export default function order(state = initialState, action){
    switch(action.type){
        case "SET_ORDER":
            return({...action.payload})
        default:
            return state;
    }
}