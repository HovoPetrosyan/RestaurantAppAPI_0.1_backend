import React from "react";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import Home from "./components/Home";
import Header from "./components/Header";
import SelectUser from "./components/SelectUser";
import Box from "./components/Box"
import Table from "./components/Table";
import ChooseTable from "./components/ChooseTable";
import Back from "./components/Back";
import Order from "./components/Order";
import Trash from "./components/Trash";
import Edit from "./components/Edit";
import Print from "./components/Print";
import Pay from "./components/Pay";
import AddProduct from "./components/AddProduct";
import ChangeTable from "./components/ChangeTable";
import PayDone from "./components/PayDone";
import axios from "axios"


export default function App(){
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios.get("http://192.168.12.25:8000/api/users/all/")
    .then(res => dispatch({type: "SET_HEADER_USERS", payload: res.data}))
  }, [])
  return(
    <Router>
      <Routes>

        <Route path="/" element={
          <React.Fragment>
            <SelectUser />
            <Home />
          </React.Fragment>
        }/>

        <Route path="/table" element={
          <React.Fragment>
            <ChooseTable />
              <Header />
              <Box>
                <Table />
              </Box>
              <Back />
          </React.Fragment>
            
        }/>

        <Route path="/order" element={
          <React.Fragment>
            <PayDone />
            <AddProduct />
            <Print />
            <Pay />
            <Trash />
            <Edit />
            <ChooseTable />
            <Header>
              <ChangeTable />
            </Header>
            <Box>
              <Order />
            </Box>
            <Back />
          </React.Fragment>
        }/>

      </Routes>
    </Router>
  )
}