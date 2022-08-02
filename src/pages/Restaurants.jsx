import { useContext } from 'react';
import { Link } from 'react-router-dom';
import TableContext from '../context/TableContext';

const Restaurants = () => {
  const { restaurants } = useContext(TableContext);

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
                  <p className='text-sm mt-3'> Opens: {element.open}</p>
                  <p className='text-sm'> Closes: {element.close}</p>
                </div>
              </div>
              <div className='mb-3 flex justify-center'>
                <Link to='/'>
                  <span className='btn btn-outline btn-primary w-24 mx-1'>Book</span>
                </Link>
                <Link to={`/restaurant/${element.id}`}>
                  <span className='btn btn-outline btn-secondary w-24 mx-1'>Info</span>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  );
};

export default Restaurants;
