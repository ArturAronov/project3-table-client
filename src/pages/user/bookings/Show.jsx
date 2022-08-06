import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TableContext from '../../../context/TableContext';

import UserBookingEditModal from '../../../components/Modals/UserBookingEditModal';

const PagesUserBookingsShow = () => {
  const { bookings, getAvailableTimeslots, restaurants } = useContext(TableContext);
  const navigate = useNavigate();
  const [ editInputObj, setEditInputObj ] = useState({});

  const handleEditOnClick = element => {
    const {
      id,
      covers,
      time,
      dayDate,
      day,
      year,
      month,
      restaurantId,
    } = element;

    const daysOperating = restaurants.filter(restaurant => restaurant.id === restaurantId && restaurant)[0].daysOperating

    setEditInputObj({
      id,
      covers,
      time,
      dayDate: element.dayDate,
      day,
      year,
      month,
      restaurantId,
      daysOperating,
    });
    getAvailableTimeslots(restaurantId, covers, dayDate, month, year)
}
  return (
    <div className='w-screen'>
    <div className='text-center text-3xl m-5'>My Bookings</div>
      <div className="overflow-x-auto flex justify-center my-5">
        <table className="table table-zebra my-5">
          <thead>
            <tr>
              <th className='text-center'>Time</th>
              <th className='text-center'>Date</th>
              <th className='text-center'>Covers</th>
              <th className='text-center'>Restaurant</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(element => {
              const {
                id,
                time,
                year,
                dayDate,
                month,
                covers,
                restaurantId,
                restaurantName,
              } = element;

              return (
                <tr key={id}>
                  <td className='text-center'>{ time }</td>
                  <td className='text-center'>{ dayDate } / { month } / { year }</td>
                  <td className='text-center'>{ covers }</td>
                  <td className='text-center'>
                    <div className='cursor-pointer' onClick={() => navigate(`/restaurant/${ restaurantId }`)}>
                      { restaurantName }
                    </div>
                  </td>
                  <td className='text-center'>
                    <label
                      className='btn btn-outline btn-error'
                      htmlFor='UserBookingEditModal'
                      onClick={() => handleEditOnClick(element)
                      }
                    >

                        Edit
                    </label>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {editInputObj.day && <UserBookingEditModal input={editInputObj}/>}
        <div>
        </div>
      </div>
    </div>
  );
};


export default PagesUserBookingsShow;
