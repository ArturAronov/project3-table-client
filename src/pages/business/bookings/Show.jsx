import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TableContext from '../../../context/TableContext';
import moment from 'moment';
import axios from 'axios';

import UserInfoModal from '../../../components/Modals/UserInfoModal';

const PagesBusinessBookingsShow = () => {
  const { restaurantBookings, getRestaurantBookings } = useContext(TableContext);
  const [ dateValue, setDateValue ] = useState(new Date());
  const [ calendarData, setCalendarData ] = useState({});
  const [ daysOpen, setDaysOpen ] = useState([]);
  const [ dailyBookings, setDailyBookings ] = useState([]);
  const [ bookingInfo, setBookingInfo ] = useState([]);

  const filterData = (day, month, year) => {
    const bookings = restaurantBookings.filter(element => {
      if(element.year === year && element.month === month && element.dayDate === day) {
        return element
      };
    });

    setDailyBookings(bookings);
  };

  const bookedDays = restaurantBookings.map(element => {
    return `${element.month} ${element.dayDate}, ${element.year}`
  });



  useEffect(() => {
    getRestaurantBookings();
    axios.get(process.env.REACT_APP_API_URL + '/api/profile', {withCredentials: true})
      .then(res => {
        setDaysOpen(res.data.daysOperating.split(','));
      })

    const dateArr = moment(dateValue)
      .format("LLLL")
      .split(' ')
      .map(element => element.split('').filter(letter => letter !== ',' && letter)
      .join(''));

    setCalendarData({
      day: dateArr[0],
      date: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
    });

    filterData(dateArr[2], dateArr[1], dateArr[3]);

  }, [dateValue]);

  return (
    <div className='my-5 w-screen'>
      <div className='flex justify-center'>
        <div className='max-w-lg '>
          <Calendar
            value={dateValue}
            className='text-center'
            tileClassName={({ date }) => {
              const dateSelected = moment(date)
                .format('LL')
                .split(',  ')[0];
              const currentDate = moment(dateValue)
                .format('LL')
                .split(',  ')[0];
              const isRestaurantOpenOnTheDay = !daysOpen
                .includes(moment(date)
                  .format('LLLL')
                  .split(',')[0]
                );

              if(dateSelected === currentDate) {
                return 'bg-info text-base-100 rounded-md'
              }

              if(bookedDays.find(element => element === moment(date).format('LL'))){
                return 'text-success font-bold bg-base-300 rounded-md w-10 h-10';
              }

              if(restaurantBookings.length && isRestaurantOpenOnTheDay){
                return 'text-error font-bold w-10 h-10';
              }

              return 'w-10 h-10'
            }}


            onChange={value => {
              getRestaurantBookings();
              const dateArr = moment(dateValue)
                .format("LLLL")
                .split(' ')
                .map(element => element
                  .split('')
                  .filter(letter => letter !== ',' && letter)
                  .join('')
                );

            setCalendarData({
              day: dateArr[0],
              date: dateArr[2],
              month: dateArr[1],
              year: dateArr[3],
            });

            setDateValue(value)
          }} />

        </div>
      </div>
      <div className='text-center m-5 text-sm'>
        Date Selected: {calendarData.date} / {calendarData.month} / {calendarData.year}
      </div>
      { dailyBookings.length ?
      <div className="overflow-x-auto my-5 flex justify-center">
        <table className="table table-zebra">
          <thead>
            <tr className='text-center'>
              <td className='p-3 sm:p-5'>Time</td>
              <td className='p-3 sm:p-5'>Table</td>
              <td className='p-3 sm:p-5'>Covers</td>
              <td className='p-3 sm:p-5'>Name</td>
              <td className='p-3 sm:p-5'></td>
            </tr>
          </thead>
          <tbody>
            { dailyBookings.map(element => {
              return (
                <tr key={element.id} className='text-center text-sm sm:text-md'>
                  <td className='p-1 sm:p-3'>{element.time}</td>
                  <td className='p-1 sm:p-3'>{element.tableNr}</td>
                  <td className='p-1 sm:p-3'>{element.covers}</td>
                  <td className='p-1 sm:p-3'>
                    {
                      element?.userId ?
                      <label
                        className='text-primary cursor-pointer '
                        onClick={() => setBookingInfo(element)}
                        htmlFor="UserInfoModal"
                      >
                        {element.firstName} {element.lastName}
                      </label> :
                      <label
                        className='cursor-pointer'
                        onClick={() => setBookingInfo(element)}
                        htmlFor="UserInfoModal"
                      >
                        {element.firstName} {element.lastName}
                      </label>
                    }
                  </td>
                  <td className='btn mx-2'> Info </td>
                </tr>
              )
            }) }
          </tbody>
        </table>
        <UserInfoModal input={bookingInfo}/>
      </div>
      :
      <div className='text-center m-5 p-5'>
        No Bookings on this day
      </div>}
    </div>
  );
};

export default PagesBusinessBookingsShow;
