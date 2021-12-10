import React from "react";
import styles from "../styles/edit.module.scss";
import { useDispatch, useSelector } from "react-redux";
import closeIcon from "../assets/icons/userClose.png"


export default function Edit(){
    const dispatch = useDispatch();
    const ref = {
        count: React.useRef(null),
        result: React.useRef(null),
        amount: React.useRef(null)
    };
    const screen = useSelector(state => state.screens.edit);
    const info = useSelector(state => state.checked.checked);
    const plus = () => {
        ref.count.current.innerHTML = Number(ref.count.current.innerHTML) + 1;
    };
    const minus = () => {
        if(ref.count.current.innerHTML != 0){
            ref.count.current.innerHTML = Number(ref.count.current.innerHTML) - 1;
        }
    }
    const accept = () => {
        dispatch({type: "CLOSE_EDIT"});
        dispatch({type: "SET_CHECKED_DEFAULT"});
        ref.count.current.innerHTML = info.amount.split(" ")[0]
    }
    const close = () => {
        dispatch({type: "CLOSE_EDIT"});
        dispatch({type: "SET_CHECKED_DEFAULT"});
    }
    let price = info.price.split(" ")[0]
    return(
        <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>Խմբագրել քանակը</h2>
                    <button onClick={close}>
                        <img src={closeIcon} alt="" />
                    </button>
                </div>
                <h2 className={styles.title}></h2>
                <div className={styles.item}>
                    <h3 className={styles.name}>{info.name}</h3>
                    <div>
                        <h3><span ref={ref.amount}>{info.amount.split(" ")[0]}</span>{info.amount.split(" ")[1]}</h3>
                        <h3>{price}</h3>
                        <h3>Ընդամենը <span ref={ref.result}>{Number(info.amount.split(" ")[0]) * Number(price)} դր</span></h3>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div>
                        <button onClick={minus}>-</button>
                        <span ref={ref.count}>{info.amount.split(" ")[0]}</span>
                        <button onClick={plus}>+</button>
                    </div>
                    <button onClick={accept}>ՀԱՍՏԱՏԵԼ</button>
                </div>
            </div>
        </div>
    )
}