
import {
  GET_USER_TRANSACTIONS, 
  ADD_TIGO_TRASACTION, 
  ADD_HALO_TRASACTION, 
  ADD_VODA_TRASACTION, 
  ADD_AIR_TRASACTION, 
  DELETE_TIGO_TRANSACTION, 
  DELETE_HALO_TRANSACTION, 
  DELETE_VODA_TRANSACTION,
  DELETE_AIR_TRANSACTION,
  SET_CURRENT_TRASACTION,
  CLEAR_CURRENT_TRANSACTION,
  UPDATE_TIGO_TRASACTION,
  UPDATE_VODA_TRASACTION,
  UPDATE_HALO_TRASACTION,
  UPDATE_AIR_TRASACTION,
  AUTH_ERROR,
  SET_LOADING,
  UNSET_LOADING,
  SET_ERROR,
  SET_ALERT,
  CLEAR_ERRORS
} from './types'
import axios from 'axios'



export const getCompaniesData = (company) => async dispatch => {
  dispatch({ type: SET_LOADING })

  try {

    if (company === 'TIGO') {

      await axios.get('/transactions/data/TIGO')
      .then(function (response) {
        // handle success
        dispatch({ type: "SET_TIGO_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });
    }

    if (company === 'VODA') {

      await axios.get('/transactions/data/VODACOM')
      .then(function (response) {
        // handle success
        dispatch({ type: "SET_VODA_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });
    }

    if (company === 'HALO') {

      await axios.get('/transactions/data/HALOTEL')
      .then(function (response) {
        // handle success
        dispatch({ type: "SET_HALO_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });
    }

    if (company === 'AIR') {

    await axios.get('/transactions/data/AIRTEL')
    .then(function (response) {
      // handle success
      dispatch({ type: "SET_AIR_DATA", payload: response.data })
    })
    .catch(function (error) {
      // handle error
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch({type: AUTH_ERROR, payload: "" })
        dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
      } else {
        dispatch({type: SET_ERROR, payload: error.response.data })
      }
    })
    .then(function () {
      // always executed
    });
    }

  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.msg
    })
  }

  dispatch({ type: UNSET_LOADING })
}


//Get Transactions for owner from server
export const getTrasactions = () => async dispatch => {

  try {
    dispatch({ type: SET_LOADING })

    await axios.get('/transactions/user')
    .then(function (response) {
      // handle success
      dispatch({ type: GET_USER_TRANSACTIONS, payload: response.data })
    })
    .catch(function (error) {
      // handle error
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch({type: AUTH_ERROR, payload: "" })
        dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
      } else {
        dispatch({type: SET_ERROR, payload: error.response.data })
      }
    })
    .then(function () {
      // always executed
    });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }

  dispatch({ type: UNSET_LOADING })
}

export const getCompaniesTrasactions = () => async dispatch => {
  dispatch({ type: SET_LOADING })

  try {
    let tigo = '/transactions/TIGO'
    let voda = '/transactions/VODACOM'
    let halo = '/transactions/HALOTEL'
    let air = '/transactions/AIRTEL'
    let datatable = '/transaction/dash/datatable'
    let widgets = '/transaction/dash/widgets'
    let targets = '/transaction/dash/targets'
    let charts = '/transaction/dash/chart'

    const requestTigo = axios.get(tigo)
    const requestVoda = axios.get(voda)
    const requestHalo = axios.get(halo)
    const requestAir = axios.get(air)
    const requestDatatable = axios.get(datatable)
    const requestWidgets = axios.get(widgets)
    const requestTargets = axios.get(targets)
    const requestCharts = axios.get(charts)

    axios.all([requestTigo, requestVoda, requestHalo, requestAir, requestDatatable, requestWidgets, requestTargets, requestCharts]).then(axios.spread((...responses) => {
      const responseTIGO = responses[0]
      const responseVODA = responses[1]
      const responesHALO = responses[2]
      const responesAIR = responses[3]
      const responesDatatable = responses[4]
      const responesWidgets = responses[5]
      const responesTargets = responses[6]
      const responesCharts = responses[7]

      dispatch({ type: "SET_TIGO", payload: responseTIGO.data })
      dispatch({ type: "SET_VODA", payload: responseVODA.data })
      dispatch({ type: "SET_HALO", payload: responesHALO.data })
      dispatch({ type: "SET_AIR", payload: responesAIR.data })
      dispatch({ type: "GET_DAILY_TRANSACTIONS_DATA", payload: responesDatatable.data })
      dispatch({ type: "GET_WIDGETS_DATA", payload: responesWidgets.data })
      dispatch({ type: "GET_TARGETS_DATA", payload: responesTargets.data })
      dispatch({ type: "GET_CHART_DATA", payload: responesCharts.data })

    })).catch(error => {
      // react on errors.
      if (error.response.status === 403 || error.response.status === 401) {
        dispatch({type: AUTH_ERROR, payload: "" })
        dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
      } else {
        dispatch({type: SET_ERROR, payload: error.response.data })
      }
    })


    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }

  dispatch({ type: UNSET_LOADING })
}


//Add new tigo transaction
export const addTigoTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {
      await axios.post('/transaction/create', transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: ADD_TIGO_TRASACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Add new voda transaction
export const addVodaTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {

      await axios.post('/transaction/create', transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: ADD_VODA_TRASACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Add new halo transaction
export const addHaloTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {

      await axios.post('/transaction/create', transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: ADD_HALO_TRASACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Add new airtel transaction
export const addAirTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {

      await axios.post('/transaction/create', transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: ADD_AIR_TRASACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}


//Update new tigo transaction
export const updateTigoTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {

      await axios.put(`/transaction/update/${transaction.id}`, transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: UPDATE_TIGO_TRASACTION, payload: response.data })
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Update new voda transaction
export const updateVodaTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {

      await axios.put(`/transaction/update/${transaction.id}`, transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: UPDATE_VODA_TRASACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Update new halo transaction
export const updateHaloTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {

      await axios.put(`/transaction/update/${transaction.id}`, transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: UPDATE_HALO_TRASACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Update new airtel transaction
export const updateAirTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

  const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    try {

      await axios.put(`/transaction/update/${transaction.id}`, transaction, config)
      .then(function (response) {
        // handle success
        dispatch({ type: UPDATE_AIR_TRASACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Delete new tigo transaction
export const deleteTigoTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

    try {
      await axios.delete(`/transaction/delete/id/${transaction.id}/comp_type/${transaction.companytype}`)
      .then(function (response) {
        // handle success
        dispatch({ type: DELETE_TIGO_TRANSACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Delete new voda transaction
export const deleteVodaTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

    try {
      await axios.delete(`/transaction/delete/id/${transaction.id}/comp_type/${transaction.companytype}`)
      .then(function (response) {
        // handle success
        dispatch({ type: DELETE_VODA_TRANSACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Delete new halo transaction
export const deleteHaloTransaction = (transaction) => async dispatch => {

    dispatch({ type: SET_LOADING })

    try {

      await axios.delete(`/transaction/delete/id/${transaction.id}/comp_type/${transaction.companytype}`)
      .then(function (response) {
        // handle success
        dispatch({ type: DELETE_HALO_TRANSACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}

//Delete new airtel transaction
export const deleteAirTransaction = (transaction) => async dispatch => {

  dispatch({ type: SET_LOADING })

    try {

      await axios.delete(`/transaction/delete/id/${transaction.id}/comp_type/${transaction.companytype}`)
      .then(function (response) {
        // handle success
        dispatch({ type: DELETE_AIR_TRANSACTION, payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err.response.msg
      })
    }
  dispatch({ type: UNSET_LOADING })
}


//Set current transaction
export const setCurrentTransaction = (transaction) => {
  return {
    type: SET_CURRENT_TRASACTION, payload: transaction
  }
}


//Clear current Transaction
export const clearCurrentTransaction = () => {
  return {
    type: CLEAR_CURRENT_TRANSACTION
  }
}



//Get Chart data for specific user
export const getUserChartData = (id) => async dispatch => {

  try {
    dispatch({ type: SET_LOADING })

    await axios.get(`/transaction/dash/chart/${id}`)
      .then(function (response) {
        // handle success
        dispatch({ type: "GET_USER_CHART_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.data
    })
  }
  dispatch({ type: UNSET_LOADING })
}

//Get datatable data for specific user
export const getUserDatatableData = (id) => async dispatch => {

  try {
    dispatch({ type: SET_LOADING })

    await axios.get(`/transaction/dash/datatable/${id}`)
      .then(function (response) {
        // handle success
        dispatch({ type: "GET_USER_DATATABLE", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch({type: AUTH_ERROR, payload: "" })
          dispatch({ type: SET_ALERT, payload: {msg: "Session Ended, Please Log in", severity: 'error', data: true} })
        } else {
          dispatch({type: SET_ERROR, payload: error.response.data })
        }
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: err.response.msg
    })
  }
  dispatch({ type: UNSET_LOADING })
}


//Clear Errors
export const clearErrors = () => async dispatch =>  dispatch({ type : CLEAR_ERRORS }) 



