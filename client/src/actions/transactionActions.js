
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
  CLEAR_TRANSACTIONS,
  SET_LOADING,
  TRANSACTION_ERROR,
  SEARCH_TRANSACTIONS
} from './types'
import axios from 'axios'


export const getCompaniesData = (company) => async dispatch => {

  try {

    if (company === 'TIGO') {
      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/data/TIGO')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_TIGO_DATA", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });
    }

    if (company === 'VODA') {
      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/data/VODACOM')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_VODA_DATA", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });
    }

    if (company === 'HALO') {

      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/data/HALOTEL')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_HALO_DATA", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });
    }

    if (company === 'AIR') {
      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/data/AIRTEL')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_AIR_DATA", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });
    }

  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.msg
    })
  }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
}

export const getCompaniesTrasactions = () => async dispatch => {

  try {
      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/TIGO')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_TIGO", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/VODACOM')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_VODA", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/HALOTEL')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_HALO", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

      dispatch({ type: SET_LOADING })

      await axios.get('/transactions/AIRTEL')
        .then(function (response) {
          // handle success
          dispatch({ type: "SET_AIR", payload: response.data })
        })
        .catch(function (error) {
          // handle error
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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
          dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
        })
        .then(function () {
          // always executed
        });

    } catch (err) {
      dispatch({
        type: TRANSACTION_ERROR,
        payload: err.response.msg
      })
    }
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

//Get widgets data for specific user
export const getWidgetsData = () => async dispatch => {

  try {
    dispatch({ type: SET_LOADING })

    await axios.get('/transaction/dash/widgets')
      .then(function (response) {
        // handle success
        dispatch({ type: "GET_WIDGETS_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.msg
    })
  }
}

//Get Targets data for specific user
export const getTargetsData = () => async dispatch => {

  try {
    dispatch({ type: SET_LOADING })

    await axios.get('/transaction/dash/targets')
      .then(function (response) {
        // handle success
        dispatch({ type: "GET_TARGETS_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.msg
    })
  }
}

//Get Chart data for specific user
export const getChartData = () => async dispatch => {

  try {
    dispatch({ type: SET_LOADING })

    await axios.get('/transaction/dash/chart')
      .then(function (response) {
        // handle success
        dispatch({ type: "GET_CHART_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.data
    })
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
        dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.data
    })
  }
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
        dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.msg
    })
  }
}

//Get Daily Transactions data for specific user
export const getDailyTransactionsData = () => async dispatch => {

  try {
    dispatch({ type: SET_LOADING })

    await axios.get('/transaction/dash/datatable')
      .then(function (response) {
        // handle success
        dispatch({ type: "GET_DAILY_TRANSACTIONS_DATA", payload: response.data })
      })
      .catch(function (error) {
        // handle error
        dispatch({type: TRANSACTION_ERROR, payload: error.response.data })
      })
      .then(function () {
        // always executed
      });

  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: err.response.msg
    })
  }
}



