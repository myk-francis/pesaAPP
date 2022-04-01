import React, {Fragment} from 'react'
import Rhombus from './Rhombus.gif'

const LoaderTwo = () => {
  return (
    <Fragment>
      <img src={Rhombus} alt='Loading...' style={{ height:'20px',width:'20px', display: 'block', margin: 'auto' }}></img>
    </Fragment>
  )
}

export default LoaderTwo