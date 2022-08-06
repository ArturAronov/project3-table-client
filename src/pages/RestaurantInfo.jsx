import { useContext, useEffect } from 'react';
import TableContext from '../context/TableContext';

const RestaurantInfo = () => {
  const { getRestaurantInfo, restaurantInfo } = useContext(TableContext);
  const id = window.location.href.split('/').reverse()[0];

  const {
    name,
    building,
    street,
    city,
    zipCode,
    country,
    phone,
    email,
    open,
    close,
    daysOperating,
    logo
  } = restaurantInfo;

  useEffect(() => {
    getRestaurantInfo(id);
  }, []);

  return (
    <div className='w-screen my-5'>
      <div className='flex justify-center my-5'>
        {Object.keys(restaurantInfo).length && (
          <div className="stats stats-vertical shadow sm:max-w-sm overflow-hidden">

            <div className='stat'>
              <div className="stat-value text-center mb-5">{ name }</div>
              <div className='flex justify-center w-100'>
                <img src={logo} alt={name} className='rounded-lg '/>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-center">Address</div>
              <div className="text-2xl text-center">{ building }</div>
              <div className="text-2xl text-center">{ street }</div>
              <div className="text-2xl text-center">{ zipCode && `${zipCode}, `} { city }</div>
              <div className="text-2xl text-center">{ country }</div>
            </div>
            <div className="stat">
              <div className="stat-title text-center">Phone</div>
              <div className="text-2xl text-center">{ phone }</div>
            </div>
            <div className="stat">
              <div className="stat-title text-center">Email</div>
              <div className="text-2xl text-center">{ email }</div>
            </div>
            <div className="stat">
              <div className="stat-title text-center">Days open</div>
              <div className="text-2xl text-center">{ daysOperating.split(',').map(element => element.substring(0,3)).join(', ') }</div>
            </div>
            <div className="stat">
              <div className="stat-title text-center">Booking Hours</div>
              <div className="text-2xl text-center">{ open } - { close }</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantInfo;
