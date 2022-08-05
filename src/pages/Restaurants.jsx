import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TableContext from '../context/TableContext';
import UserBookingModal from '../components/Modals/UserBookingModal';

const Restaurants = () => {
  const { restaurants, login } = useContext(TableContext);
  const [ bookButtonStyle, setBookButtonStyle ] = useState('btn btn-disabled w-24 mx-1');
  const [ inputData, setInputData ] = useState({})

  const bookButton = element => {
    return (
      <label
        htmlFor='userBookingModal'
        className={bookButtonStyle}
        onClick={ () => setInputData(element)}
      >
        Book
      </label>
    );
  };

  useEffect(() => {
    login ? setBookButtonStyle('btn btn-outline btn-primary w-24 mx-1') : setBookButtonStyle('btn btn-disabled w-24 mx-1');

  }, [login]);

  return (
    <div className='my-5 w-screen'>
      <div className='flex justify-center flex-wrap'>
      {restaurants.map(element => {
        return (
          <div className='m-3' key={element.id}>
            <div className="card glass h-full w-60">
              <div className='p-3 h-60 grid content-center'>
                <img src={element.logo} alt={element.name} style={{borderRadius: 10}}/>
              </div>
              <div className="card-body py-2 p-5">
                <div>
                  <p className="card-title flex justify-center mb-2"> {element.name} </p>
                  <p className='text-sm'> {element.building} </p>
                  <p className='text-sm'> {element.street} </p>
                  <p className='text-sm'> {element.city}, {element.country} </p>
                  <p className='text-sm mt-3'> First Booking: {element.open}</p>
                  <p className='text-sm'> Last Booking: {element.close}</p>
                </div>
              </div>
              <div className='mb-3 flex justify-center'>
                <Link to={`/restaurant/${element.id}`}>
                  <span className='btn btn-outline btn-secondary w-24 mx-1'>Info</span>
                </Link>
                { bookButton(element) }
              </div>
            </div>
          </div>
        )
      })}
      <UserBookingModal input={inputData}/>
      </div>
    </div>
  );
};

export default Restaurants;
