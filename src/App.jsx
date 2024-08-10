import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails";
import ItemPage from "./pages/ItemDetail/ItemDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/item/:id" element={<ItemPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;