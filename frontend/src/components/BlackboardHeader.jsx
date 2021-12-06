import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "../style/BlackboardHeader.module.css";
import exit from "../assets/icons/exit.png"
import UserChange from "./UserChange";

const userArr = {
    user1: require("../assets/user/user1.png").default,
    user2: require("../assets/user/user2.png").default,
    user3: require("../assets/user/user3.png").default,
}
export default function BlacboardHeader(){
    const dispatch = useDispatch();
    const {userName, userImg} = useSelector(state => state.user);
    const hall = useSelector(state => state.blackboard.hall);
    const tableNumber = useSelector(state => state.blackboard.tableNumber);
    const title = useSelector(state => state.blackboard.title);
    const history = useHistory();
    const user = userArr[userImg]
    const logout = () => {
        dispatch({type: "UPDATE_ORDER_COUNT", payload: {}})
        dispatch({type: "USER_LOGOUT", payload: null})
        history.replace("/")
    }
    const replaceUser = () => {
        dispatch({type: "USER_CHANGE", payload: true})
    }
    return(
        <div className={styles.main}>
            <UserChange />
            <div className={styles.box}>
                <img src={user} onClick={replaceUser}/>
                <h3>{userName}</h3>
                <h3>Պատվերների քանակ ։ 25</h3>
                <p className={styles.hall}>{hall}</p>
                <p className={styles.tableNumber}>{tableNumber}</p>
            </div>
            <div className={styles.situation}>
                <div className={styles.container}>
                    <button onClick={logout}>
                        <img src={exit}/>
                        <p>ԵԼՔ</p>
                    </button>
                    <h2>{title}</h2>
                </div>
            </div>
        </div>
    )
}