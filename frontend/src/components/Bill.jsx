import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/Bill.module.css";
import RemoveLine from "./RemoveLine";
import Edit from "./Edit"
import Pay from "./Pay";
import PayDone from "./PayDone";
import AddProduct from "./AddProduct";
import top from "../assets/icons/top.png";
import bottom from "../assets/icons/bottom.png";
import left from "../assets/icons/left.png";
import trash from "../assets/icons/trash.png";
import edit from "../assets/icons/edit.png";
import trashFill from "../assets/icons/trash_fill.png";
import editFill from "../assets/icons/edit_fill.png";
import orderFill from "../assets/icons/order_fill.png";



export default function Bill(){
    const history = useHistory();
    const parent = React.useRef(null);
    const container = React.useRef(null)
    const dispatch = useDispatch();
    const [breadCrumbs, setBreadCrumbs] = React.useState(["Հիմնական պատվերներ"])
    const {tableNumber, checked, menuItems} = useSelector(state => state.bill);
    const {orderItems} = useSelector(state => state.table);
    const item = orderItems[tableNumber];
    let price = 0;
    item.billItems.forEach(e => {price += e.amount * e.price})
    React.useEffect(() => {
        dispatch({type: "HALL", payload: "Սրահ ։ Բառ"})
        dispatch({type: "TABLE_NAME", payload: "Սեղան ։ "+tableNumber})
        dispatch({type: "TITLE", payload: ""})
    })
    const handleChange = (e) => {
        const checkboxes = parent.current.getElementsByTagName("input");
        let checkedElem = e.target.checked;
        for(let elem of checkboxes){
            if(elem !== e.target){
                elem.checked = false
            }
        }
        const value = JSON.parse(e.target.value);
        if(checkedElem){
            dispatch({type: "CHECKED", payload: true})
            dispatch({type: "REMOVE_LINE_ITEM", payload: value})
        }else{
            dispatch({type: "CHECKED", payload: false})
            dispatch({type: "REMOVE_LINE_ITEM", payload: {}})
        }
    }
    const checkedOff = () => {
        const checkboxes = parent.current.getElementsByTagName("input");
        for(let elem of checkboxes){
            elem.checked = false
        }
    }
    const handleClick = (e) => {
        const name = e.currentTarget.getAttribute("value");
        const arr = [];
        Object.assign(arr, breadCrumbs)
        arr.push(name)
        setBreadCrumbs(arr)
    }
    const back = () => {
        const arr = [];
        Object.assign(arr, breadCrumbs)
        arr.pop();
        setBreadCrumbs(arr)
    }
    const goToRemoveLine = () => {
        dispatch({type: "REMOVE_LINE", payload: true})
    }
    const goToEdit = () => {
        dispatch({type: "EDIT", payload: true})
    }
    const goToPay = () => {
        dispatch({type: "PAY", payload: true})
    }
    const up = () => {
        container.current.scrollTo(0, container.current.scrollTop-=157);
    }
    const down = () => {
        container.current.scrollTo(0, container.current.scrollTop+=157);
    }
    const addProduct = (name, price) => {
        dispatch({type: "ADD_PRODUCT", payload: true})
        dispatch({type: "NEW_ORDER", payload: {name,price}})
    }
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
            dispatch({type: "UPDATE_ORDER_COUNT", payload: arr})
            dispatch({type: "PAY_DONE", payload: false})
            history.goBack();
        }, 900);
    }
    return(
        <div className={styles.box}>
            <RemoveLine checkedOff={checkedOff}/>
            <Edit checkedOff={checkedOff}/>
            <Pay />
            <PayDone />
            <AddProduct />
            <div className={styles.coupon}>
                <h2>Կտրոն</h2>
                <div className={styles.couponContent} ref={parent}>
                    {
                        item.billItems.map((e,index)=> {
                            return(
                                <div className={styles.item} key={"coupon-item"+index}>
                                    <input type="checkbox" name="orderLine" onChange={handleChange} value={JSON.stringify(e)}/>
                                    <div>
                                        <h3>{e.name}</h3>
                                        <h3>{e.amount} {e.amountName}</h3>
                                        <h3>{e.price} Դր</h3>
                                        <h3>{e.price * e.amount} Դր</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={styles.price}>
                    <h3>ԸՆԴՀԱՆՈՒՐ <span>{price} դր</span></h3>
                    <div>
                        <button className={styles.btn} disabled={!checked} onClick={goToRemoveLine}>
                            {!checked ? <img src={trash} /> : <img src={trashFill} />}
                        </button>
                        <button className={styles.btn} disabled={!checked ? true : false} onClick={goToEdit}>
                            {!checked ? <img src={edit} /> : <img src={editFill} />}
                        </button>
                        <button className={styles.btn} onClick={goToPay}>
                            <img src={orderFill} />
                        </button>
                        <button className={styles.pay} onClick={toPayDone}>ՎՃԱՐԵԼ</button>
                    </div>
                </div>
            </div>
            <div className={styles.orders}>
                <div className={styles.breadCrumbs}>
                    {breadCrumbs.map((e, index) => <span key={"span"+index}>{e} /&nbsp;</span>)}
                </div>
                <div className={styles.meals} ref={container}>
                    {
                        menuItems.map((e, index) => {
                            if(breadCrumbs.length === 1){
                                    return(
                                        <section key={`meal-${index}`} onClick={handleClick} value={e.name}>
                                            <img src={e.img}/>
                                            <h2>{e.name}</h2>
                                        </section>
                                    )
                            }else if(breadCrumbs[1] === e.name){ 
                                return e.items.map((e, index) => {
                                        return(
                                            <section key={`meals-item-${index}`} name={e.name} price={e.price} onClick={() => addProduct(e.name, e.price)}>
                                                <img src={e.img}/>
                                                <h2>{e.name}</h2>
                                            </section>
                                        )
                                })
                            }
                        })
                    }
                </div>
            </div>
            <div className={styles.buttons}>
                <button onClick={up}><img src={top} /></button>
                <button onClick={back} disabled={breadCrumbs.length === 1 ? true : false}><img src={left}/></button>
                <button onClick={down}><img src={bottom}/></button>
            </div>
        </div>
    )
}
