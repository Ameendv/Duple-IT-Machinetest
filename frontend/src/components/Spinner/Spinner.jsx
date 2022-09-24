import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

function Spins() {
  return (
    <div className='container'>
       <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )
}

export default Spins
