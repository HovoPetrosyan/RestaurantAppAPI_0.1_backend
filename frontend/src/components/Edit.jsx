import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/Edit.module.css";


export default function Edit(props){
    const dispatch = useDispatch();
    const {removeLineItem, tableNumber} = useSelector(state => state.bill)
    const edit = useSelector(state => state.screens.edit)
    const {orderItems} = useSelector(state => state.table);
    const billItems = orderItems[tableNumber].billItems;
    const yes = () => {
        // dispatch({type: "REMOVE_BILL_ITEM", payload: arr})
        let arr = [];
        const name = removeLineItem.name;
        if(removeLineItem.amount !== 0){
            arr = billItems.map(e => {
                return e.name === name ? removeLineItem : e;
            })
        }else{
            for(let e of billItems){
                if(e.name !== name) arr.push(e);
            }
        }


        const obj = {};
        Object.assign(obj, orderItems)
        obj[tableNumber] = {
            type: obj[tableNumber].type,
            count: obj[tableNumber].count,
            billItems: arr
        }
        props.checkedOff();
        dispatch({type: "EDIT", payload: false})
        dispatch({type: "CHECKED", payload: false})
        dispatch({type: "REMOVE_LINE_ITEM", payload: {}})
        dispatch({type: "UPDATE_ORDER_COUNT", payload: obj})

    };
    const add = () => {
        const lineArr = {};
        Object.assign(lineArr, removeLineItem);
        lineArr.amount += 1;
        dispatch({type: "REMOVE_LINE_ITEM", payload: lineArr})
    };
    const remove = () => {
        if(removeLineItem.amount !== 0){
            const lineArr = {};
            Object.assign(lineArr, removeLineItem);
            lineArr.amount -= 1;
            dispatch({type: "REMOVE_LINE_ITEM", payload: lineArr})
        }
    };
    return(
        <div className={edit ? styles.active : styles.box}>
            <div className={styles.content}>
                <h2 className={styles.title}>Խմբագրել քանակը</h2>
                <div className={styles.item}>
                    <h3 className={styles.name}>{removeLineItem.name}</h3>
                    <div>
                        <h3>{removeLineItem.amount} {removeLineItem.amountName}</h3>
                        <h3>{removeLineItem.price} դր</h3>
                        <h3>Ընդամենը {removeLineItem.price * removeLineItem.amount} դր</h3>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div>
                        <button onClick={remove}>-</button>
                        <span>{removeLineItem.amount}</span>
                        <button onClick={add}>+</button>
                    </div>
                    <button onClick={yes}>ՀԱՍՏԱՏԵԼ</button>
                </div>
            </div>
        </div>
    )
}