import React from 'react'
import NavBar from '../../components/NavBar'
import SearchBar from '../../components/SearchBar'
import Footer from '../../components/Footer'
import RestaurantCardDetail from '../../components/RestaurantCardDetail'
import Breadcrumb from '../../components/BreadCrumb'
import ResturantCategory from '../../components/ResturantCategory'

const ResturantByCategory = () => {
  return (
    <div className='font-figtree'>
    <NavBar />
    <Breadcrumb/>
    <SearchBar />
    <ResturantCategory/>
    <Footer />
    
    
    
    </div>
  )
}

export default ResturantByCategory