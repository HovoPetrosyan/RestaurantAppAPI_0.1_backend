import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/trash.module.scss";
export default function Trash(){
    const dispatch = useDispatch();
    const screen = useSelector(state => state.screens.trash);
    const info = useSelector(state => state.checked.checked);
    const accept = () => {
        cancel();
    }
    const cancel = () => dispatch({type: "CLOSE_TRASH"});
    return(
        <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
            <div>
                <h2>Մաքրել՞ տողը</h2>
                <section>
                    <h3 className={styles.name}>{info.name}</h3>
                    <div>
                        <h3>{info.amount}</h3>
                        <h3>{info.price}</h3>
                        <h3>Ընդամենը {info.result}</h3>
                    </div>
                </section>
                <button onClick={accept}>ԱՅՈ</button>
                <button onClick={cancel}>ՈՉ</button>
            </div>
        </div>
    )
}