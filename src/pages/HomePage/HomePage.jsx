import React from 'react'
import NavBar from '../../components/NavBar'
import HeroSectionHome from '../../components/HeroSectionHome'
import SearchBar from '../../components/SearchBar'
import FoodCategories from '../../components/FoodCategories'
import RestaurantCard from '../../components/RestaurantCard'
import FAQs from '../../components/FAQs'
import Footer from '../../components/Footer'
import Download from '../../components/Download'
import RestaurantCardDetail from '../../components/RestaurantCardDetail'

const HomePage = () => {
  return (
    <>
    <div className='max-w-1440 font-figtree' >
    <NavBar/>
    <HeroSectionHome/>
    <SearchBar/>
    <FoodCategories/>
    <RestaurantCard />
    <FAQs />
    <Download />

{/* <RestaurantCardDetail /> */}


    <Footer />



    </div>
    

    </>
  )
}

export default HomePage