import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import styles from "../style/Supplier.module.css";
import supplier1 from "../assets/supplier/supplier1.png";
import supplier2 from "../assets/supplier/supplier2.png";
export default function Supplier(props){
    const history = useHistory()
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({type: "TITLE", payload: "ԸՆՏՐԵԼ ՄԱՏԱԿԱՐԱՐԻՆ"})
        dispatch({type: "HALL", payload: ""})
        dispatch({type: "TABLE_NAME", payload: ""})
    })
    return(
        <div className={styles.box}>
            <section onClick={() => history.push("/blackboard/table")}>
                <img src={supplier1}/>
                <h2>Բառ</h2>
            </section>
            <section>
                <img src={supplier2}/>
                <h2>Խոհանոց</h2>
            </section>
        </div>
    )
}