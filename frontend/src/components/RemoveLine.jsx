import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/RemoveLine.module.css";
export default function RemoveLine(props){
    const dispatch = useDispatch();
    const {removeLineItem, tableNumber} = useSelector(state => state.bill);
    const {orderItems} = useSelector(state => state.table);
    const billItems = orderItems[tableNumber].billItems;
    const removeLine = useSelector(state => state.screens.removeLine)
    const yes = () => {
        const arr = [];
        const obj = {};
        Object.assign(obj, orderItems);
        for(let e of billItems){
            if(e.name === removeLineItem.name){
                continue;
            }else{
                arr.push(e)
            }
        }
        obj[tableNumber] = {
            type: obj[tableNumber].type,
            count: obj[tableNumber].count,
            billItems: arr
        }
        props.checkedOff()
        dispatch({type: "UPDATE_ORDER_COUNT", payload: obj})
        dispatch({type: "REMOVE_LINE", payload: false})
        dispatch({type: "CHECKED", payload: false})
        dispatch({type: "REMOVE_LINE_ITEM", payload: {}})
    };
    const no = () => {
        dispatch({type: "REMOVE_LINE", payload: false})
    };
    return(
        <div className={removeLine ? styles.active : styles.box}>
            <div className={styles.content}>
                <h2 className={styles.title}>Մաքրել՞ տողը</h2>
                <div className={styles.item}>
                    <h3 className={styles.name}>{removeLineItem.name}</h3>
                    <div>
                        <h3>{removeLineItem.amount} {removeLineItem.amountName}</h3>
                        <h3>{removeLineItem.price} դր</h3>
                        <h3>Ընդամենը {removeLineItem.price * removeLineItem.amount} դր</h3>
                    </div>
                </div>
                <button onClick={yes}>ԱՅՈ</button>
                <button onClick={no}>ՈՉ</button>
            </div>
        </div>
    )
}