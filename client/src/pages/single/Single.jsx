import "./single.scss";
import "./datatable.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import UserPopUp from '../../components/forms/UserPopUp'
import { usersCompDataColumns } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";

import { setWarningAlerts, setSuccessAlerts, setErrorAlerts } from '../../actions/darkActions'
import { setOwnerCurrentUser, clearOwnerUserCurrent } from '../../actions/userActions'
import { getUserDatatableData, getUserChartData } from '../../actions/transactionActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../components/layout/Spinner'
import {useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";


const Single = ({ setErrorAlerts, getUserDatatableData, user_datatable, user_chart, getUserChartData, setOwnerCurrentUser, clearOwnerUserCurrent, users, authState }) => {
  const navigate = useNavigate()
  const [openModal, setOpen] = useState(false);

  const openPopUp = () => {
    setOpen(true);
  };

  const closePopUP = () => {
    setOpen(false);
  };

  let params = useParams();

  let user = {}
  user = users.filter(user => user.id === parseInt(params.userId))[0]

  useEffect(() => {
    if (!users.some(user => user.id === parseInt(params.userId))) {
    setErrorAlerts("User does not exist")
    navigate("/users")
    return
  }

    setOwnerCurrentUser(user)
    getUserChartData(params.userId)
    getUserDatatableData(params.userId)

    return () => {
      clearOwnerUserCurrent()
    }
  }, [user])


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {openModal && <UserPopUp closePopUP={closePopUP} openModal={openModal}/>}
          <div className="left">
            {authState.user_is_owner && <div className="editButton" onClick={openPopUp}>Edit</div>}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{user.id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phonenumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {user.user_city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{user.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className={`itemValue ${user.user_status}`}>{user.user_status}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {user_chart !== null && <Chart chart={user_chart} aspect={3 / 1} title="User Spending ( Last 6 Months)" />}
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          {user_datatable !== null && (<DataGrid
          className="datagrid"
          rows={user_datatable}
          columns={usersCompDataColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />)
        }
        </div>
      </div>
    </div>
  );
};


Single.propTypes = {
  setWarningAlerts : PropTypes.func.isRequired,
  setSuccessAlerts : PropTypes.func.isRequired,
  setErrorAlerts : PropTypes.func.isRequired,
  setOwnerCurrentUser : PropTypes.func.isRequired,
  clearOwnerUserCurrent : PropTypes.func.isRequired,
  getUserChartData : PropTypes.func.isRequired,
  getUserDatatableData : PropTypes.func.isRequired,
  users : PropTypes.array.isRequired,
  authState : PropTypes.object.isRequired,
  user_chart : PropTypes.array,
  user_datatable : PropTypes.array
}

const mapStateToProps = state => ({
  users : state.user.owner_users,
  authState : state.authState.user, 
  user_chart : state.transactions.user_chart,
  user_datatable: state.transactions.user_datatable
})

export default connect(mapStateToProps, { getUserDatatableData, getUserChartData, setWarningAlerts, setSuccessAlerts, setErrorAlerts, setOwnerCurrentUser, clearOwnerUserCurrent })(Single)
