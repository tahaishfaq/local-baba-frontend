import React from 'react'
import NavBar from '../../components/NavBar'
import SeeAllRestaurant from '../../components/SeeAll'
import Footer from '../../components/Footer'
import Breadcrumb from '../../components/BreadCrumb'

const SeeAllPage = () => {
  return (
    <div className='font-figtree'>
    <NavBar/>
    {/* <Breadcrumb /> */}
    <SeeAllRestaurant/>
    <Footer/>
    </div>
  )
}

export default SeeAllPage