import React from 'react'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import Footer from '../../components/Footer'
import RestaurantCardDetail from '../../components/RestaurantCardDetail'

import ResturantCategory from '../../components/ResturantCategory'
import BreadCrumb from '../../components/PagesLink'

const ResturantByCategory = () => {
  return (
    <div className='font-figtree'>
    <NavBar />
    <BreadCrumb/>
    <SearchBar />
    <ResturantCategory/>
    <Footer />
    
    
    
    </div>
  )
}

export default ResturantByCategory