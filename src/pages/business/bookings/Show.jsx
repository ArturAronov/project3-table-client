import { useContext, useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import TableContext from '../../../context/TableContext';
import moment from 'moment';

const PagesBusinessBookingsShow = () => {
  const { restaurantBookings } = useContext(TableContext);
  const [ dateValue, setDateValue ] = useState(new Date());
  const [ calendarData, setCalendarData ] = useState({});
  const [ bookingData, setBookingData ] = useState({});
  const [ loadData, setLoadData] = useState(false)

  const filterData = () => {
    return restaurantBookings.filter(element => {
      if(element.year === calendarData.year && element.month === calendarData.month && element.dayDate === calendarData.date) {
        return element
      };
    });
  };


  useEffect(() => {
    const dateArr = moment(dateValue).format("LLLL").split(' ').map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));

    setCalendarData({
      day: dateArr[0],
      date: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
    });




  }, [restaurantBookings, dateValue]);

  return (
    <div className='my-5 w-screen'>
      <div className='flex justify-center'>
        <div className='max-w-lg '>
          <ReactCalendar value={dateValue} onChange={value => {
            const dateArr = moment(dateValue).format("LLLL").split(' ').map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));

            setCalendarData({
              day: dateArr[0],
              date: dateArr[2],
              month: dateArr[1],
              year: dateArr[3],
            });

            setDateValue(value)
          }} className='text-center flex-justify-center'/>
        </div>
      </div>

      <div className="overflow-x-auto my-5 flex justify-center">
        <table className="table table-zebra">
          <thead>
            <tr className='text-center'>
              <th>Time</th>
              <th>Date</th>
              <th>Time</th>
              <th>Covers</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { filterData().map(element => {
              return (
                <tr key={element.id}>
                  <td>{element.time}</td>
                  <td>{element.dayDate}/{element.month}/{element.year}</td>
                  <td>{element.time}</td>
                  <td>{element.covers}</td>
                  <td>{element.firstName} {element.lastName}</td>
                  <td className='btn'> Info </td>
                </tr>
              )
            }) }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagesBusinessBookingsShow;
