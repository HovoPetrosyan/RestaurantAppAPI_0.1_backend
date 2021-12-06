import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styles from "../style/Table.module.css";
import left from '../assets/icons/left.png';
import right from '../assets/icons/right.png';
import Order from "./Order";
const itemsCount = 14;
export default function Table(){
    const dispatch = useDispatch();
    const history = useHistory();
    const {array, count, orderItems, orderNumber} = useSelector(state => state.table);
    const [arrState, setArrState] = React.useState(array);
    React.useEffect(() => {
        dispatch({type: "TITLE", payload: "ԸՆՏՐԵԼ  ՍԵՂԱՆԸ"})
        dispatch({type: "HALL", payload: "Սրահ ։ Բառ"})
        dispatch({type: "TABLE_NAME", payload: ""})
    })
    const toRight = () => {
        const arr = [];
        Object.assign(arr, array);
        for(let x = 0; x < 3 * (count + 1);x++){
            arr.shift();
        }
        setArrState(arr)
        dispatch({type: "TORIGHT", payload: null})
    }
    const toLeft = () => {
        const arr = [];
        Object.assign(arr, array);
        for(let x = 0; x < 3 * (count - 1);x++){
            arr.shift();
        }
        setArrState(arr)
        dispatch({type: "TOLEFT", payload: null})
    }
    const handleClick = (e) => {
        const number = e.target.innerHTML;
        dispatch({type: "ORDER_NUMBER", payload: number})
        dispatch({type: "ORDER", payload: true})
    }
    const goToBill = (e) => {
        const number = e.target.innerHTML;
        const arr = {};
        Object.assign(arr, orderItems);
        arr[number] = {
            type: "ordered",
            count: arr[number].count,
            billItems: arr[number].billItems
        }
        dispatch({type: "TABLE_NUMBER", payload: number})
        dispatch({type: "UPDATE_ORDER_COUNT", payload: arr})
        history.push("/blackboard/table/bill")
    }
    return(
        <React.Fragment>
            <div className={styles.box}>
                <Order />
                <button 
                className={styles.btn}
                onClick={toLeft} 
                disabled={count == 0 ? true : false}
                >
                    <img src={left}/>
                </button>


                <div className={styles.container}>
                    {
                        arrState.map((e, index) => {
                            if(index <= itemsCount){
                                let value = "";
                                if(typeof orderItems[e.toString()] !== "undefined"){
                                    value = orderItems[e.toString()].type
                                }
                                return <button 
                                className={styles.item} 
                                onClick={value === "ordered" ? goToBill : handleClick} 
                                value={value}
                                key={`tableItem-${index}`}
                                >{e}</button>
                            }
                        })
                    }
                </div>


                <button 
                className={styles.btn} 
                onClick={toRight}
                disabled={(array.length-itemsCount) / 3 === count ? true:false}
                >
                    <img src={right}/>
                </button>
            </div>
        </React.Fragment>
    )
}