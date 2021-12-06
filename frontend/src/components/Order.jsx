import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/Order.module.css";
import userClose from "../assets/icons/userClose.png";
import { useHistory } from "react-router";

export default function Order(props){
    const history = useHistory();
    const dispatch = useDispatch();
    const order = useSelector(state => state.screens.order);
    const {orderNumber, orderItems} = useSelector(state => state.table)
    let orderCount = typeof orderItems[orderNumber] === "undefined" ? 0 : orderItems[orderNumber].count;
    const close = () => {
        dispatch({type: "ORDER", payload: false})
    }
    const add = () => {
        const arr = {};
        Object.assign(arr, orderItems);
        if(typeof arr[orderNumber] === "undefined"){
            arr[orderNumber] = {
                count: 0
            }
        }
        arr[orderNumber] = {
            count: arr[orderNumber].count + 1
        }
        dispatch({type: "UPDATE_ORDER_COUNT", payload: arr})
        
    }
    const remove = () => {
        const arr = {};
        Object.assign(arr, orderItems);
        if(arr[orderNumber].count !== 0){
            arr[orderNumber] = {
                count: arr[orderNumber].count - 1,
            }
            dispatch({type: "UPDATE_ORDER_COUNT", payload: arr})
        }
    }
    const toBill = () => {
        const arr = {};
        Object.assign(arr, orderItems);
        arr[orderNumber] = {
            type: "ordered",
            count: arr[orderNumber].count,
            billItems: []
        }
        close();
        dispatch({type: "TABLE_NUMBER", payload: orderNumber})
        dispatch({type: "UPDATE_ORDER_COUNT", payload: arr})
        history.push("/blackboard/table/bill")
    }
    const toFix = () => {
        const arr = {};
        Object.assign(arr, orderItems);
        arr[orderNumber] = {
            type: "fixed",
            count: arr[orderNumber].count,
            billItems: []

        }
        close();
        dispatch({type: "TABLE_NUMBER", payload: orderNumber})
        dispatch({type: "UPDATE_ORDER_COUNT", payload: arr})
    }
    return(
        <div className={order ? styles.active : styles.box}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Ձևակերպել պատվեր</h2>
                    <button onClick={close}>
                        <img src={userClose}/>
                    </button>
                </div>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <button 
                        disabled={orderCount === 0 ? true : false}
                        onClick={toFix}
                        >ԱՄՐԱԳՐԵԼ</button>
                        <button 
                        disabled={orderCount === 0 ? true : false}
                        onClick={toBill}
                        >ՊԱՏՎԵՐ</button>
                    </div>
                    <div className={styles.right}>
                        <h3>Հյուրերի քանակը</h3>
                        <button onClick={add}>+</button>
                        <h2>{orderCount}</h2>
                        <button onClick={remove}>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}