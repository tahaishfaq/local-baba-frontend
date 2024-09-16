import React from 'react'
import NavBar from '../../components/NavBar'
import SeeAllRestaurant from '../../components/SeeAll'
import Footer from '../../components/Footer'
import BreadCrumb from '../../components/PagesLink'


const SeeAllPage = () => {
  return (
    <div className='font-figtree'>
    <NavBar/>
    <BreadCrumb />
    <SeeAllRestaurant/>
    <Footer/>
    </div>
  )
}

export default SeeAllPage