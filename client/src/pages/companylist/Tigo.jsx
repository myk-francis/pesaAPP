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

const Tigo = ({ tigo_data, loading, getCompaniesData }) => {

  useEffect(() => {
    getCompaniesData('TIGO')

    //eslint-disable-next-line
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (tigo_data === null) {
    return (
    <div className="companylist">
      <Sidebar/>
      <div className="complistContainer">
        <Navbar/>
        <div className="datatable">
        <div className="datatableTitle">
          Tigo Records
        </div>
        <h2>Add records...</h2>) : <Spinner/>
      </div>
      </div>
    </div>
  )
  }


  return (
    <div className="companylist">
      <Sidebar/>
      <div className="complistContainer">
        <Navbar/>
        <div className="datatable">
        <div className="datatableTitle">
          Tigo Records
        </div>
        {tigo_data !== null && !loading ? (<DataGrid
          className="datagrid"
          rows={tigo_data}
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
  tigo_data : PropTypes.array
}

const mapStateToProps = state => ({
  tigo_data : state.transactions.tigo_data,
  loading : state.transactions.loading
})

export default connect(mapStateToProps, { setWarningAlerts, setSuccessAlerts, setErrorAlerts, getCompaniesData })(Tigo)
