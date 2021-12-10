import { configureStore } from '@reduxjs/toolkit'
import screens from './reducers/screens'
import table from './reducers/table'
import user from "./reducers/user"
import header from "./reducers/header"
import checked from './reducers/checked';
import order from './reducers/order';
import billItems from './reducers/billItems';
export default configureStore({
    reducer: { screens, user, header, checked, order, table, billItems }
})