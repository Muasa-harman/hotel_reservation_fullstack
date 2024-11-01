import {  BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './context/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import HotelSearch from './pages/HotelSearch';


function App() {
  const {isLoggedIn} = useAppContext();
  return (
    // <BrowserRouter>
    <Router> 
    <Routes>
      <Route path='/' element={<Layout><HotelSearch/></Layout>}/>
      <Route path='/search' element={<Layout><Search/></Layout>}/>
      <Route path='/detail/:hotelId' element={<Layout><Detail/></Layout>}/>
      <Route path='/register' element={<Layout><Register/></Layout>}/>
      <Route path='/sign-in' element={<Layout><SignIn/></Layout>}/>
      {isLoggedIn && <>
      <Route path='/add-hotel' element={<Layout><AddHotel/></Layout>}/>
      <Route path='/edit-hotel/:hotelId' element={<Layout><EditHotel/></Layout>}/>
      <Route path='/my-hotels' element={<Layout><MyHotels/></Layout>}/>
      <Route path='/hotel/:hotelId/booking' element={<Layout><Booking/></Layout>}/>
      </>}
      <Route path='*' element={<Navigate to="/" />}/>
    </Routes>
    </Router> 
    
    // </BrowserRouter>
   
  )
}

export default App;

