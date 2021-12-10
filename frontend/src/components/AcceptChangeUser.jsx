import React from "react";
import styles from "../styles/acceptChangeUser.module.scss"
import { useSelector, useDispatch } from "react-redux";


export default function AcceptChangeUser(props){
    const dispatch = useDispatch();
    const screen = useSelector(state => state.screens.acceptChangeUser);
    const close = () => {
        dispatch({type: "CLOSE_ACCEPT_CHANGE_USER"})
    }

    return(
        <React.Fragment>
            <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
                <div>
                    <h2>Փոխել՞ մատուցողին</h2>
                    <div className={styles.content}>
                        <h3>{props.userName}</h3>
                        <button>ԱՅՈ</button>
                        <button onClick={close}>ՈՉ</button>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}