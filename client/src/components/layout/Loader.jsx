import React, {Fragment} from 'react'
import Circles from './Circles.gif'

const Loader = () => {
  return (
    <Fragment>
      <img src={Circles} alt='Loading...' style={{ height:'50px',width:'50px', display: 'block', margin: 'auto' }}></img>
    </Fragment>
  )
}

export default Loader