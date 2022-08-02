import { useContext } from 'react';
import TableContext from '../../../context/TableContext';

const PagesUserBookingsShow = () => {
  const { bookings } = useContext(TableContext);
  return (
    <div className='w-screen'>
      <div className="overflow-x-auto flex justify-center my-5">
        <table className="table table-compact table-zebra">
          <thead>
            <tr>
              <th className='text-center'>Time</th>
              <th className='text-center'>Date</th>
              <th className='text-center'>Covers</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody>
              {bookings.map(element => {
                return (
                  <tr>
                    <td className='text-center'>{element.time}</td>
                    <td className='text-center'>{element.dayDate}/{element.month}/{element.year}</td>
                    <td className='text-center'>{element.covers}</td>
                    <td className='text-center'>
                      <div className='btn btn-outline btn-primary'>Edit</div>
                    </td>

                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagesUserBookingsShow;
