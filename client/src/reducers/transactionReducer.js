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
} from '../actions/types'

const initalState = {
  user: null,
  current_transaction: null,
  tigo_transactions: null,
  voda_transactions: null,
  halo_transactions: null,
  air_transactions: null,
  widgets: null,
  targets: null,
  chart: null,
  user_chart: null,
  user_datatable: null,
  table: null,
  tigo_data: null,
  voda_data: null,
  halo_data: null,
  air_data: null,
  isAuthenticated: null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initalState, action) => {
  switch(action.type) {
    case GET_USER_TRANSACTIONS:
      return {
        ...state, 
        user: action.payload
      }
    case "SET_TIGO_DATA":
      return {
        ...state, 
        tigo_data: action.payload
      }
    case "SET_VODA_DATA":
      return {
        ...state, 
        voda_data: action.payload
      }
    case "SET_HALO_DATA":
      return {
        ...state, 
        halo_data: action.payload
      }
    case "SET_AIR_DATA":
      return {
        ...state, 
        air_data: action.payload
      }
    case "SET_TIGO":
      return {
        ...state, 
        tigo_transactions: action.payload
      }
    case "SET_VODA":
      return {
        ...state, 
        voda_transactions: action.payload
      }
    case "SET_HALO":
      return {
        ...state, 
        halo_transactions: action.payload
      }
    case "SET_AIR":
      return {
        ...state, 
        air_transactions: action.payload
      }
    case ADD_TIGO_TRASACTION:
      return {
        ...state, 
        tigo_transactions: [ action.payload, ...state.tigo_transactions ]
      }
    case ADD_VODA_TRASACTION:
      return {
        ...state, 
        voda_transactions: [ action.payload, ...state.voda_transactions ]
      }
    case ADD_HALO_TRASACTION:
      return {
        ...state, 
        halo_transactions: [ action.payload, ...state.halo_transactions ]
      }
    case ADD_AIR_TRASACTION:
      return {
        ...state, 
        air_transactions: [ action.payload, ...state.air_transactions ]
      }
    
    case UPDATE_TIGO_TRASACTION:
      return {
        ...state, 
        tigo_transactions: state.tigo_transactions.map(tigo => tigo.id === action.payload.id ? action.payload : tigo)
      }

    case UPDATE_VODA_TRASACTION:
      return {
        ...state, 
        voda_transactions: state.voda_transactions.map(voda => voda.id === action.payload.id ? action.payload : voda)
      }

    case UPDATE_HALO_TRASACTION:
      return {
        ...state, 
        halo_transactions: state.halo_transactions.map(halo => halo.id === action.payload.id ? action.payload : halo)
      }

    case UPDATE_AIR_TRASACTION:
      return {
        ...state, 
        air_transactions: state.air_transactions.map(air => air.id === action.payload.id ? action.payload : air)
      }

    case DELETE_TIGO_TRANSACTION:
      return {
        ...state, 
        tigo_transactions: state.tigo_transactions.map(tigo => tigo.id === action.payload.id ? action.payload : tigo)
        // tigo_transactions: state.tigo_transactions.map(tigo => tigo.id === action.payload.id ? Object.assign({}, tigo, {status: "Deleted"}) : tigo),
      }

    case DELETE_VODA_TRANSACTION:
      return {
        ...state, 
        voda_transactions: state.voda_transactions.map(voda => voda.id === action.payload.id ? action.payload : voda)
      }

    case DELETE_HALO_TRANSACTION:
      return {
        ...state, 
        halo_transactions: state.halo_transactions.map(halo => halo.id === action.payload.id ? action.payload : halo)
      }

    case DELETE_AIR_TRANSACTION:
      return {
        ...state, 
        air_transactions: state.air_transactions.map(air => air.id === action.payload.id ? action.payload : air)
      }
    case SET_CURRENT_TRASACTION:
      return {
        ...state, 
        current_transaction: action.payload
      }
    
    case CLEAR_CURRENT_TRANSACTION:
      return {
        ...state, 
        current_transaction: null
      }

    case "GET_WIDGETS_DATA":
      return {
        ...state, 
        widgets: action.payload
      }

    case "GET_TARGETS_DATA":
      return {
        ...state, 
        targets: action.payload
      }
    
    case "GET_CHART_DATA":
      return {
        ...state, 
        chart: action.payload
      }

    case "GET_USER_CHART_DATA":
      return {
        ...state, 
        user_chart: action.payload
      }

    case "GET_USER_DATATABLE":
      return {
        ...state, 
        user_datatable: action.payload
      }
    
    case "GET_DAILY_TRANSACTIONS_DATA":
      return {
        ...state, 
        table: action.payload
      }

    default: 
      return {
      ...state
    }
  }
}