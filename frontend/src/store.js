import { configureStore } from "@reduxjs/toolkit";
import blackboard from "./reducers/blackboard";
import table from "./reducers/table";
import user from "./reducers/user";
import bill from "./reducers/bill";
import screens from "./reducers/screens";
export default configureStore({
    reducer: {
        user: user,
        blackboard: blackboard,
        table: table,
        bill: bill,
        screens: screens
    },
})