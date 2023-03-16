import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className='footer-style bg-black text-light'>
            <p className='text-center p-2'>Copyright<span>&#169;</span> 2023 NewsMonkey.  All rights reserved</p>
        </footer>
      </>
    )
  }
}
