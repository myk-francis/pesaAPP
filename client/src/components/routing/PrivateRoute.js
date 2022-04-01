import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/authActions'
import { clearErrors } from '../../actions/transactionActions'
import Loader from '../layout/Loader'

const PrivateRoute = ({ authState, authError, logout, clearErrors }) => {

  const auth = authState.isAuthenticated; // determine if authorized, from context or however you're doing it


  if (authState.loading) {
    // If initialState.isLoading = false, 
    // then your application will skip this step
    // (just after a refresh)
    return <Loader/>
  } else if (auth) {
    // But because USER_LOADING is not triggered yet,
    // your are not authenticated !
    return <Outlet />
  } else {
    // Then you drop here
    return <Navigate to="/login" />
  }

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  // auth && !authState.loading ? <Outlet /> : <Navigate to="/login" />
}

const mapStateToProps = state => ({
  authState : state.authState
})

export default connect(mapStateToProps, { logout, clearErrors })(PrivateRoute)