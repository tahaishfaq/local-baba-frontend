import React from 'react'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import Footer from '../../components/Footer'
import RestaurantCardDetail from '../../components/RestaurantCardDetail'
import BreadCrumb from '../../components/BreadCrumb'


const RestaurantDetails = () => {
  return (
    <div className='font-figtree'>
    <NavBar />
    <BreadCrumb/>
    <SearchBar />
    <RestaurantCardDetail/>
    <Footer />
    
    
    
    </div>
  )
}

export default RestaurantDetails