import React from "react";
import styles from "../styles/edit.module.scss";
import { useSelector, useDispatch } from "react-redux";
import closeIcon from "../assets/icons/userClose.png"
import axiosInstance from "../axios";


export default function AddProduct(){
    const dispatch = useDispatch();
    const [count, setCount] = React.useState(1);
    const info = useSelector(state => state.order);
    const screen = useSelector(state => state.screens.addProduct);
    const billItems = useSelector(state => state.billItems);
    const tableId = useSelector(state => state.table.table)
    const plus = () => setCount(count + 1);
    const minus = () => count != 1 ? setCount(count - 1) : false;
    const close = () => {
        dispatch({type: "CLOSE_ADD_PRODUCT"});
        setCount(1);
    }
    const accept = () => {
        const obj = {...billItems}
        let productCount = count;
        if(obj[tableId]){
            const result = obj[tableId].filter(e => e.id !== info.id)
            if(result == []){
                obj[tableId] = [...obj[tableId],{
                    id: info.id,
                    title: info.title,
                    price: info.price,
                    count: productCount,
                    result: productCount * info.price
                }]
            }else{
                obj[tableId].map(e => {
                    if(e.id === info.id){
                        productCount+=e.count;
                    }
                })
                obj[tableId] = [...result,{
                    id: info.id,
                    title: info.title,
                    price: info.price,
                    count: productCount,
                    result: productCount * info.price
                }]
            }
        }else{
            obj[tableId] = [{
                id: info.id,
                title: info.title,
                price: info.price,
                count: count,
                result: count * info.price
            }];
        }
        dispatch({type: "SET_BILL_ITEMS" , payload: obj});
        close();
    }
    return(
        <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
            <div className={styles.content}>
                <h2 className={styles.title}>Կցել պատվերը 
                    <button onClick={close}>
                        <img src={closeIcon} alt="" />
                    </button>
                </h2>
                <div className={styles.item}>
                    <h3 className={styles.name}>{info.title}</h3>
                    <div>
                        <h3>{count} հատ</h3>
                        <h3>{info.price} դր</h3>
                        <h3>Ընդամենը {info.price * count} դր</h3>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <div>
                        <button onClick={minus}>-</button>
                        <span>{count}</span>
                        <button onClick={plus}>+</button>
                    </div>
                    <button onClick={accept}>ՀԱՍՏԱՏԵԼ</button>
                </div>
            </div>
        </div>
    )
}