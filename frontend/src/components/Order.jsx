import React from "react";
import styles from "../styles/order.module.scss";
import {useDispatch, useSelector} from "react-redux";
import top from "../assets/icons/top.png";
import bottom from "../assets/icons/bottom.png";
import left from "../assets/icons/left.png";
import trash from "../assets/icons/trash.png";
import edit from "../assets/icons/edit.png";
import order from "../assets/icons/order.png";
import axios from "axios";

const mealsImg = {
	img1: require("../assets/meals/hot.png").default
}

export default function Order(){
	const dispatch = useDispatch();
    const [products, setProducts] = React.useState([])
    const [checked, setChecked] = React.useState(null);
    const [bread, setBread] = React.useState(["Հիմնական պատվերներ / "])
    const tableId = useSelector(state => state.table.table)
    const ref = React.useRef(null);
    const billItems = useSelector(state => state.billItems);

    let total = 0;
    if(billItems[tableId]) billItems[tableId].map(e => total+=e.result);

	React.useEffect(() => {
		dispatch({type: "HEADER_HALL", payload: "Սրահ ։ Բառ"});
		dispatch({type: "HEADER_TABLE", payload: `Սեղան ։ ${tableId}`});
        axios.get("/api/products/")
        .then(res => setProducts(res.data))
	}, []);

    const handleChange = e => {
        if(e.currentTarget.value !== checked){
            setChecked(e.currentTarget.value);
            for(let elem of ref.current.children){
                if(elem.children[0] !== e.currentTarget){
                    elem.children[0].checked = false;
                }
            }
            const element = e.currentTarget.nextSibling;
            const name = element.children[0].innerHTML;
            const amount = element.children[1].innerHTML;
            const price = element.children[2].innerHTML;
            const result = element.children[3].innerHTML;

            dispatch({type: "SET_CHECKED", payload: {name, amount, price, result}});

        }else{
            setChecked(null)
        }
    }
    const openTrash = () => dispatch({type: "OPEN_TRASH"});
    const openEdit = () => dispatch({type: "OPEN_EDIT"});
    const openPrint = () => dispatch({type: "OPEN_PRINT"});
    const openPay = () => dispatch({type: "OPEN_PAY"});
    const back = () => setBread([[...bread][0]]);
    const openAddProduct = e => {
        dispatch({type: "OPEN_ADD_PRODUCT"});
        const obj = JSON.parse(e.currentTarget.getAttribute("value"));
        dispatch({type: "SET_ORDER", payload: {...obj}})
    };
    const goToMeals = e => {
        const type = e.currentTarget.getAttribute("value");
        const arr = [...bread];
        arr.push(type);
        setBread(arr)
    }
	return(
		<div className={styles.box}>
            <div className={styles.coupon}>
                <h2>Կտրոն</h2>
                <div className={styles.couponContent} ref={ref}>                    
                    {
                        billItems[tableId] ? billItems[tableId].map((e, index) => {
                            return(
                                <section className={styles.item} key={`order-${index}`}>
                                    <input value={index} type="checkbox" onChange={handleChange}/>
                                    <div>
                                        <h3>{e.title}</h3>
                                        <h3>{e.count} Բաժակ</h3>
                                        <h3>{e.price} դր</h3>
                                        <h3>{e.result} դր</h3>
                                    </div>
                                </section>
                            )
                        }) : false
                    }
                </div>
                <div className={styles.price}>
                    <h3>ԸՆԴՀԱՆՈՒՐ <span>{total} դր</span></h3>
                    <div>
                        <button className={styles.btn} disabled={checked ? false : true} onClick={openTrash}>
                            <img src={trash} />
                        </button>
                        <button className={styles.btn} disabled={checked ? false : true} onClick={openEdit}>
                            <img src={edit} />
                        </button>
                        <button className={styles.btn} onClick={openPrint}>
                            <img src={order} />
                        </button>
                        <button className={styles.pay} onClick={openPay}>ՎՃԱՐԵԼ</button>
                    </div>
                </div>
            </div>
            <div className={styles.orders}>
                <div className={styles.breadCrumbs}>
                    <span>{bread.map(e => e)}</span>
                </div>
                <div className={styles.meals}>
	                {
                        bread.length === 1 ? 
                        menu.map((e, index) => {
                            return(
                                <section key={"meals"+index} value={e.title} type={e.type} onClick={goToMeals}>
                                    <img src={e.img}/>
                                    <h2>{e.title}</h2>
                                </section>
                            )     
                        }) :
                        products.map(e => {
                            return(
                                <section key={e.kod_1c} onClick={openAddProduct} value={JSON.stringify(e)}>
                                    <img src={mealsImg.img1}/>
                                    <h2>{e.title}</h2>
                                </section>
                            )
                        })
                        
                    }
                </div>
            </div>
            <div className={styles.buttons}>
                <button disabled={true}><img src={top}/></button>
                <button onClick={back} disabled={bread.length == 1 ? true : false}><img src={left} /></button>
                <button disabled={true}><img src={bottom}/></button>
            </div>
        </div>
	)
}



const menu = [
    {
        type: "soup",
        img: require("../assets/meals/soup.png").default,
        title: "Ապուրներ",
    },
    {
        type: "salad",
        img: require("../assets/meals/salad.png").default,
        title: "Աղցաններ",
    },
    {
        type: "Hot Dishes",
        img: require("../assets/meals/hot.png").default,
        title: "Տաք ուտեստներ",
    },
    {
        type: "Pizza",
        img: require("../assets/meals/pizza.png").default,
        title: "Պիցցա",
    },
]