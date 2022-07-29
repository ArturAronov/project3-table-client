import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PagesHome from './pages/Home';
import About from './pages/About';
import Restaurants from './pages/Restaurants';

import PagesAuthLogin from './pages/auth/Login';
import PagesAuthSignup from './pages/auth/Signup';

import PagesBusinessBookingsCreate from './pages/business/bookings/Create';
import PagesBusinessBookingsShow from './pages/business/bookings/Show';
import PagesBusinessBookingsUpdate from './pages/business/bookings/Update';

import PagesUserBookingsCreate from './pages/user/bookings/Create';
import PagesUserBookingsShow from './pages/user/bookings/Show';
import PagesUserBookingsUpdate from './pages/user/bookings/Update';

import PagesBusinessProfileShow from './pages/business/profile/Show';
import PagesBusinessProfileUpdate from './pages/business/profile/Update';

import PagesUserProfileShow from './pages/user/profile/Show';
import PagesUserProfileUpdate from './pages/user/profile/Update';

import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<PagesHome />} />
        <Route path='/about' element={<About />} />
        <Route path='/restaurants' element={<Restaurants />} />

        <Route path='/auth/signup' element={<PagesAuthSignup />} />
        <Route path='/auth/login' element={<PagesAuthLogin />} />

        <Route path='/user/profile' element={<PagesUserProfileShow />} />
        <Route path='/user/profile/edit' element={<PagesUserProfileUpdate />} />

        <Route path='/business/profile' element={<PagesBusinessProfileShow />} />
        <Route path='/business/profile/edit' element={<PagesBusinessProfileUpdate />} />

        <Route path='/business/bookings' element={<PagesBusinessBookingsShow />} />
        <Route path='/business/bookings/create' element={<PagesBusinessBookingsCreate />} />
        <Route path='/business/bookings/:id/update' element={<PagesBusinessBookingsUpdate />} />

        <Route path='/user/bookings' element={<PagesUserBookingsShow />} />
        <Route path='/user/bookings/create' element={<PagesUserBookingsCreate />} />
        <Route path='/user/bookings/:id/update' element={<PagesUserBookingsUpdate />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
