import { useState, useContext } from 'react';
import TableContext from '../../../context/TableContext';

import UserBookingEditModal from '../../../components/Modals/UserBookingEditModal';

const PagesUserBookingsShow = () => {
  const { bookings, getAvailableTimeslots } = useContext(TableContext);

  const [ editInputObj, setEditInputObj ] = useState({});
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
                return (
                  <tr key={element.id}>
                    <td className='text-center'>{element.time}</td>
                    <td className='text-center'>{element.dayDate}/{element.month}/{element.year}</td>
                    <td className='text-center'>{element.covers}</td>
                    <td className='text-center'>{element.restaurantName}</td>
                    <td className='text-center'>
                      <label
                        className='btn btn-outline btn-error'
                        htmlFor='UserBookingEditModal'
                        onClick={() => {
                          setEditInputObj({
                            id: element.id,
                            covers: element.covers,
                            time: element.time,
                            dayDate: element.dayDate,
                            day: element.day,
                            year: element.year,
                            month: element.month,
                            restaurantId: element.restaurantId,
                          });

                          getAvailableTimeslots(element.restaurantId, element.covers, element.dayDate, element.month, element.year);
                          }
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
