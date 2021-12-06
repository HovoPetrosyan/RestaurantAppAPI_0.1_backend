import React from "react";
import styles from "../style/Pay.module.css";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import close from "../assets/icons/userCloseGray.png"

export default function Pay(){
    const dispatch = useDispatch()
    const history = useHistory();
    const {tableNumber} = useSelector(state => state.bill);
    const {orderItems} = useSelector(state => state.table);
    const {pay} = useSelector(state => state.screens);
    const billItems = orderItems[tableNumber].billItems
    let price = 0;
    billItems.forEach(e => {price += e.amount * e.price})
    const toPayDone = () => {
        dispatch({type: "PAY_DONE", payload: true})
        setTimeout(() => {
            const arr = {};
            Object.assign(arr, orderItems);
            arr[tableNumber] = {
                type: "none",
                count: 0,
                billItems: []
            };
            dispatch({type: "PAY", payload: false})
            dispatch({type: "UPDATE_ORDER_COUNT", payload: arr})
            dispatch({type: "PAY_DONE", payload: false})
            history.goBack();
        }, 900);
    }
    return(
        <div className={pay ? styles.active : styles.box}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Կտրոն</h2>
                    <button onClick={() => dispatch({type: "PAY", payload: false})}>
                        <img src={close} alt="" />
                    </button>
                </div>
                <div className={styles.container}>
                {
                    billItems.map(e => {
                        return(
                            <div className={styles.item}>
                                <h3>{e.name}</h3>
                                <h3>{e.amount} {e.amountName}</h3>
                                <h3>{e.price} Դր</h3>
                                <h3>{e.price * e.amount} Դր</h3>
                            </div>
                        )
                    })
                }
                </div>
                <div className={styles.footer}>
                    <h3>ԸՆԴՀԱՆՈՒՐ <span>{price} դր</span></h3>
                    <form>
                        <input type="checkbox" id="discount"/>
                        <label htmlFor="discount">Զեղչ 10%</label>
                    </form>
                    <button onClick={toPayDone}>ՎՃԱՐԵԼ</button>
                </div>
            </div>
        </div>
    )
}