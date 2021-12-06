import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "../style/Edit.module.css"
export default function AddProduct(props){
    const dispatch = useDispatch()
    const addProduct = useSelector(state => state.screens.addProduct)
    const {newOrder} = useSelector(state => state.bill)
    const {orderItems, orderNumber} = useSelector(state => state.table)
    const [count, setCount] = React.useState(1)
    const yes = () => {
        if(count !== 0){
            const arr = [];
            Object.assign(arr, orderItems[orderNumber].billItems);
            arr.push({
                name: newOrder.name,
                amount: count,
                amountName: "հատ",
                price: newOrder.price
            })
            const obj = {};
            Object.assign(obj, orderItems);
            obj[orderNumber] = {
                type: obj[orderNumber].type,
                count: obj[orderNumber].count,
                billItems: arr

            }
            dispatch({type: "UPDATE_ORDER_COUNT", payload: obj})
        }
        setCount(1)
        dispatch({type: "ADD_PRODUCT", payload: false})
    }
    const remove = () => count !== 0 ? setCount(count-1) : false;
    const add = () => setCount(count+1);
    return(
        <div className={addProduct ? styles.active : styles.box}>
            <div className={styles.content}>
                <h2 className={styles.title}>Կցել պատվերը</h2>
                <div className={styles.item}>
                    <h3 className={styles.name}>{newOrder.name}</h3>
                    <div>
                        <h3>{count} հատ</h3>
                        <h3>{newOrder.price} դր</h3>
                        <h3>Ընդամենը {newOrder.price * count} դր</h3>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div>
                        <button onClick={remove}>-</button>
                        <span>{count}</span>
                        <button onClick={add}>+</button>
                    </div>
                    <button onClick={yes}>ՀԱՍՏԱՏԵԼ</button>
                </div>
            </div>
        </div>
    )
}