import React from 'react'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import Footer from '../../components/Footer'
import RestaurantCardDetail from '../../components/RestaurantCardDetail'
import Breadcrumb from '../../components/BreadCrumb'

const RestaurantDetails = () => {
  return (
    <div className='font-figtree'>
    <NavBar />
    <Breadcrumb/>
    <SearchBar />
    <RestaurantCardDetail/>
    <Footer />
    
    
    
    </div>
  )
}

export default RestaurantDetails