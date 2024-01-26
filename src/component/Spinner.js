import React, { Component } from 'react'
import laodingspinner from './laodingspinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={laodingspinner} alt="loading" />
      </div>
    )
  }
}

export default Spinner