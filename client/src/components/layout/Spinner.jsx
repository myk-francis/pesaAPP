import React, {Fragment} from 'react'
import spinner from './Book.gif'

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt='Loading...' style={{ height:'40px',width:'40px', display: 'block', margin: 'auto' }}></img>
    </Fragment>
  )
}

export default Spinner
