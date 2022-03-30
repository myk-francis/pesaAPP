import React from 'react'
import "./companylist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable"

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { companyDataColumns } from "../../datatablesource";
import { useEffect } from "react";
import { setWarningAlerts, setSuccessAlerts, setErrorAlerts,  } from '../../actions/darkActions'
import {  getCompaniesData } from '../../actions/transactionActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../../components/layout/Spinner'

const Air = ({ air_data, loading, getCompaniesData }) => {

  useEffect(() => {
    getCompaniesData('AIR')

    //eslint-disable-next-line
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (air_data === null) {
    return <h2>Add records...</h2>
  }


  return (
    <div className="companylist">
      <Sidebar/>
      <div className="complistContainer">
        <Navbar/>
        <div className="datatable">
        <div className="datatableTitle">
          Airtel Records
        </div>
        {air_data !== null && !loading ? (<DataGrid
          className="datagrid"
          rows={air_data}
          columns={companyDataColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
        />) : <Spinner/>
        }
      </div>
      </div>
    </div>
  )
}

Datatable.propTypes = {
  setWarningAlerts : PropTypes.func.isRequired,
  setSuccessAlerts : PropTypes.func.isRequired,
  setErrorAlerts : PropTypes.func.isRequired,
  loading : PropTypes.bool,
  air_data : PropTypes.array
}

const mapStateToProps = state => ({
  air_data : state.transactions.air_data,
  loading : state.transactions.loading
})

export default connect(mapStateToProps, { setWarningAlerts, setSuccessAlerts, setErrorAlerts, getCompaniesData })(Air)
