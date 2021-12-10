import React from "react";
import styles from "../styles/header.module.scss";
import exitIcon from "../assets/icons/exit.png";
import userIcon from "../assets/user/user1.png";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ChangeUser from "./ChangeUser";


export default function Header(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {hall, table, title} = useSelector(state => state.header);
    const {userName} = useSelector(state => state.user)
    const exit = () => {
        navigate("/")
    }
    const openChangeUser = () => {
        dispatch({type: "OPEN_CHANGE_USER"});
    }
    return(
        <div className={styles.box}>
            <div className={styles.header}>
                <div 
                style={{display: "flex", alignItems: "center", gap: 30}}
                onClick={openChangeUser}
                >
                    <img src={userIcon}/>
                    <h3>{userName}</h3>
                </div>
                <h3>Պատվերների քանակ ։ 25</h3>
                <p className={styles.hall}>{hall}</p>
                <p className={styles.tableNumber}>{table}</p>
            </div>
            <div className={styles.state}>
                <div>
                    <button onClick={exit}>
                        <img src={exitIcon}/>
                        <p>ԵԼՔ</p>
                    </button>
                    <h2>{title}</h2>
                    <div>{props.children}</div>
                </div>
            </div>
            <ChangeUser />
        </div>
    )
}