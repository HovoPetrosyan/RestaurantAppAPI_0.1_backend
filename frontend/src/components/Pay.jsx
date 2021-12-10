import React from "react";
import styles from "../styles/pay.module.scss";
import {useDispatch, useSelector} from "react-redux";
import closeIcon from "../assets/icons/userCloseGray.png"
import axiosInstance from "../axios";


export default function Print(){
	const dispatch = useDispatch();
    const [payment, setPayment] = React.useState(null);
	const screen = useSelector(state => state.screens.pay);
    const tableId = useSelector(state => state.table.table);
    const billItems = useSelector(state => state.billItems);
    const {userName} = useSelector(state => state.user)


    let total = 0;
    if(billItems[tableId])billItems[tableId].map(e => total+=e.result);


	const accept = () => {
        close();
        dispatch({type: "OPEN_PAY_DONE"})
        setTimeout(() => dispatch({type: "CLOSE_PAY_DONE"}), 1200)
        axiosInstance.post("/api/orders/add/", {
            payment,
            user: userName,
            productInOrder: billItems[tableId],
            total_price: total
        })
    };


	const close = () => dispatch({type: "CLOSE_PAY"});
    const paymentChange = e => setPayment(e.target.id);

	return(
        <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
            <div>
                <div className={styles.header}>
                    <h2>Կտրոն</h2>
                    <button onClick={close}>
                        <img src={closeIcon} alt="" />
                    </button>
                </div>
                <div className={styles.container}>
                    {
                        billItems[tableId] ? billItems[tableId].map((e, index) => {
                            return(
                                <section key={`pay-${index}`}>
                                    <h3>{e.title}</h3>
                                    <h3>{e.count} Բաժակ</h3>
                                    <h3>{e.price} դր</h3>
                                    <h3>{e.result} Դր</h3>
                                </section>
                            )
                        }) : false
                    }
                </div>
                <div className={styles.footer}>
                    <div>
                        <h3>ԸՆԴՀԱՆՈՒՐ <span>{total} դր</span></h3>
                        <form>
                            <input type="checkbox" id="stock"/>
                            <label htmlFor="stock">Զեղչ 10%</label>
                        </form>
                    </div>
                    <div >
                        <div className={styles.paymentBox}>

                            <label htmlFor="cash">Կանխիկ</label>
                            <input type="radio" id="cash" name="payment" onChange={paymentChange}/>

                            <label htmlFor="posSystem">Պոս համակարգ</label>
                            <input type="radio" id="posSystem" name="payment" onChange={paymentChange}/>

                        </div>
                        <button className={styles.pay} onClick={accept} disabled={payment ? false : true}>ՎՃԱՐԵԼ</button>
                    </div>
                </div>
            </div>
        </div>
	)
}