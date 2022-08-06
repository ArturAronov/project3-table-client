import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { TableProvider } from '../context/TableContext';

import App from './App';

import PagesHome from '../pages/Home';
import About from '../pages/About';
import Restaurants from '../pages/Restaurants';
import RestaurantInfo from '../pages/RestaurantInfo';

import PagesAuthLogin from '../pages/auth/Login';
import PagesAuthSignup from '../pages/auth/Signup';

import PagesBusinessBookingsShow from '../pages/business/bookings/Show';

import PagesUserBookingsShow from '../pages/user/bookings/Show';

import PagesBusinessProfileShow from '../pages/business/profile/Show';
import PagesBusinessProfileUpdate from '../pages/business/profile/Update';

import PagesUserProfileShow from '../pages/user/profile/Show';
import PagesUserProfileUpdate from '../pages/user/profile/Update';

function Routing() {
  return (
    <BrowserRouter>
      <TableProvider>

        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<PagesHome />} />
            <Route path='/about' element={<About />} />
            <Route path='/restaurants' element={<Restaurants />} />
            <Route path='/restaurant/:id' element={<RestaurantInfo />} />

            <Route path='/auth/signup' element={<PagesAuthSignup />} />
            <Route path='/auth/login' element={<PagesAuthLogin />} />

            <Route path='/user/profile' element={<PagesUserProfileShow />} />
            <Route path='/user/profile/edit' element={<PagesUserProfileUpdate />} />

            <Route path='/business/profile' element={<PagesBusinessProfileShow />} />
            <Route path='/business/profile/edit' element={<PagesBusinessProfileUpdate />} />

            <Route path='/business/bookings' element={<PagesBusinessBookingsShow />} />/>

            <Route path='/user/bookings' element={<PagesUserBookingsShow />} />

          </Route>
        </Routes>
      </TableProvider>
    </BrowserRouter>
  );
};

export default Routing;
