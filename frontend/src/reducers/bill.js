const initialState = {
    billItems: [
    ],
    menuItems: [
        {
            img: require("../assets/meals/soup.png").default,
            name: "Ապուրներ",
            items: [
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1700

                },
                {
                    img: require("../assets/meals/soup2.png").default,
                    name: "Լոբով ապուր",
                    price: 1300

                },
                {
                    img: require("../assets/meals/soup3.png").default,
                    name: "Բրոկոլիով ապուր",
                    price: 5200

                },
                {
                    img: require("../assets/meals/soup4.png").default,
                    name: "Բորշ",
                    price: 900

                },
            ]
        },
        {
            img: require("../assets/meals/salad.png").default,
            name: "Աղցաններ",
            items: [
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "amricanp",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
            ]
        },
        {
            img: require("../assets/meals/hot.png").default,
            name: "Տաք ուտեստներ",
            items: [
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },

            ]
        },
        {
            img: require("../assets/meals/pizza.png").default,
            name: "Պիցցա",
            items: [
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },
                {
                    img: require("../assets/meals/soup1.png").default,
                    name: "Սպաս",
                    price: 1200
                },

            ]
        }
    ],
    tableNumber: "",
    checked: false,
    newOrder: {
        name: "",
        price: ""
    },
    removeLineItem: {}
}
export default function(state = initialState, action){
    switch(action.type){
        case "TABLE_NUMBER":
            return{...state, tableNumber: action.payload}
        case "REMOVE_LINE_ITEM":
            return{...state, removeLineItem: action.payload}
        case "UPDATE_BILL_ITEM":
            return{...state, billItems: action.payload}
        case "CHECKED":
            return{...state, checked: action.payload}
        case "BILL_DEFAULT":
            return {...state, ...initialState};
        case "NEW_ORDER":
            return{...state, newOrder: action.payload}
        default:
            return state
    }
}