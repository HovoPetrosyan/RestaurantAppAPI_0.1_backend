import React from "react";
import styles from "../styles/chooseTable.module.scss";
import userClose from "../assets/icons/userClose.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axiosInstance from "../axios";

export default function ChooseTable(){
    const [count, setCount] = React.useState(1)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const screen = useSelector(state => state.screens.chooseTable);
    const {table, tableType} = useSelector(state => state.table);
    const close = () => dispatch({type: "CLOSE_CHOOSE_TABLE"});
    const plus = () => setCount(count+1);
    const minus = () => count != 0 ? setCount(count-1) : false;

    React.useEffect(() => {
        dispatch({type: "HEADER_TABLE", payload: null})
    }, [])

    const fix = () => {
        axiosInstance.post("/api/tables/gettable/", {
            type: "order",
            id: table
        }).then((res) => {
            setCount(1);
            dispatch({type: "CLOSE_CHOOSE_TABLE"});
            dispatch({type: "HEADER_TABLE", payload: `Սեղան ։ ${table}`});
            navigate("/order")
            axiosInstance.get("/api/tables/all/")
            .then(res => {
                dispatch({type: "SET_TABLE_ITEMS", payload: res.data})
            })
        })

        
    }
    const reserve = () => {
        axiosInstance.post("/api/tables/gettable/", {
            type: "reserve",
            id: table
        }).then(() => {
            setCount(1);
            dispatch({type: "CLOSE_CHOOSE_TABLE"});
            dispatch({type: "HEADER_TABLE", payload: `Սեղան ։ ${table}`});
            axiosInstance.get("/api/tables/all/")
            .then(res => {
                dispatch({type: "SET_TABLE_ITEMS", payload: res.data})
            })
        })

        
    }
    const cancelBook = () => {
        axiosInstance.post("/api/tables/unmarktable/", {
            id: table
        })
        .then(() => {
            setCount(1);
            dispatch({type: "CLOSE_CHOOSE_TABLE"});
            axiosInstance.get("/api/tables/all/")
            .then(res => {
                dispatch({type: "SET_TABLE_ITEMS", payload: res.data})
            })
        })
        
    }
    return(
        <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
            <div>
                <div className={styles.header}>
                    <h2>Ձևակերպել պատվեր</h2>
                    <button onClick={close}>
                        <img src={userClose}/>
                    </button>
                </div>
                <div className={styles.container}>
                    <div className={styles.left}>
                        {
                            tableType === "reserved"? 
                            <button 
                            disabled={count === 0 ? true : false} 
                            onClick={cancelBook} 
                            className={styles.cancel}
                            >ՉԵՂԱՐԿԵԼ ԱՄՐԱԳՐՈՒՄԸ</button> :
                            <button 
                            disabled={count === 0 ? true : false} 
                            onClick={reserve}
                            >ԱՄՐԱԳՐԵԼ</button>
                        }
                        <button disabled={count === 0 ? true : false} onClick={fix}>ՊԱՏՎԵՐ</button>
                    </div>
                    <div className={styles.right}>
                        <h3>Հյուրերի քանակը</h3>
                        <button onClick={plus}>+</button>
                        <h2>{count}</h2>
                        <button onClick={minus}>-</button>
                    </div>
                </div>
            </div>
        </div>
    )
}