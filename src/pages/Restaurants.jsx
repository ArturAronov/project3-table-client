import { useContext } from 'react';
import TableContext from '../context/TableContext';

const Restaurants = () => {
  const { restaurants } = useContext(TableContext);

  return (
    <div className='my-5 w-screen'>
      <div className='flex justify-center flex-wrap'>
      {restaurants.map(element => {
        return (
          <div className="card glass w-60  m-3" key={element.id}>
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
          </div>
        )
      })}
      </div>
    </div>
  );
};

export default Restaurants;
