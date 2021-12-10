const initialState = {
    selectUser: false,
    changeUser: false,
    chooseTable: false,
    trash: false,
    edit: false,
    print: false,
    pay: false,
    addProduct: false,
    changeTable: false,
    payDone: false,
    acceptChangeUser: false
}


export default function screens(state = initialState, action){
    switch(action.type){
        case "OPEN_SELECT_USER":
            return({...state, selectUser: true})
        case "CLOSE_SELECT_USER":
            return({...state, selectUser: false})
        case "OPEN_CHANGE_USER":
            return({...state, changeUser: true})
        case "CLOSE_CHANGE_USER":
            return({...state, changeUser: false})
        case "OPEN_CHOOSE_TABLE":
            return({...state, chooseTable: true})
        case "CLOSE_CHOOSE_TABLE":
            return({...state, chooseTable: false})
        case "OPEN_TRASH":
            return({...state, trash: true})
        case "CLOSE_TRASH":
            return({...state, trash: false})
        case "OPEN_EDIT":
            return({...state, edit: true})
        case "CLOSE_EDIT":
            return({...state, edit: false})
        case "OPEN_PRINT":
            return({...state, print: true})
        case "CLOSE_PRINT":
            return({...state, print: false})
        case "OPEN_PAY":
            return({...state, pay: true})
        case "CLOSE_PAY":
            return({...state, pay: false})
        case "OPEN_ADD_PRODUCT":
            return({...state, addProduct: true})
        case "CLOSE_ADD_PRODUCT":
            return({...state, addProduct: false})
        case "OPEN_CHANGE_TABLE":
            return({...state, changeTable: true})
        case "CLOSE_CHANGE_TABLE":
            return({...state, changeTable: false})
        case "OPEN_PAY_DONE":
            return({...state, payDone: true})
        case "CLOSE_PAY_DONE":
            return({...state, payDone: false})
        case "OPEN_ACCEPT_CHANGE_USER":
            return({...state, acceptChangeUser: true})
        case "CLOSE_ACCEPT_CHANGE_USER":
            return({...state, acceptChangeUser: false})
        default:
            return state;
    }
}