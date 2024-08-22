import React from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import PayAndOrder from '../../components/PayAndOrder'

const PayAndOrderPage = () => {
  return (
    <div className='font-figtree'>
        <NavBar/>
        <PayAndOrder />
        <Footer />
    </div>
  )
}

export default PayAndOrderPage