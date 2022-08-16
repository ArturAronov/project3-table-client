import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import TableContext from '../../../context/TableContext';
import moment from 'moment';
import axios from 'axios';

import UserInfoModal from '../../../components/Modals/UserInfoModal';
import UserBookingEditModal from '../../../components/Modals/UserBookingEditModal';

const PagesBusinessBookingsShow = () => {
  const { restaurantBookings, getRestaurantBookings, getAvailableTimeslots, profile } = useContext(TableContext);

   const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
  };

  const editBtnEnabled = 'btn btn-outline btn-error btn-sm sm:btn-md'
  const editBtnDisabled = 'btn btn-disabled btn-sm sm:btn-md'

  const [ dateValue, setDateValue ] = useState(new Date());
  const [ calendarData, setCalendarData ] = useState({});
  const [ daysOpen, setDaysOpen ] = useState([]);
  const [ dailyBookings, setDailyBookings ] = useState([]);
  const [ bookingInfo, setBookingInfo ] = useState([]);
  const [ editInputObj, setEditInputObj ] = useState({});
  const [ editBtnStyle, setEditBtnStyle ] = useState(editBtnEnabled);

  const filterData = (day, month, year) => {
    const bookings = restaurantBookings.filter(element => {
      if(element.year === year && element.month === month && element.dayDate === day) {
        return element
      };
    });

    setDailyBookings(bookings);
  };

  const monthToNum = (obj, month) => {
    return obj[month] < 10 ? '0' + obj[month].toString() : obj[month].toString();
  }

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

    const daysOperating = profile.daysOperating

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

  const bookedDays = restaurantBookings.map(element => {
    return `${element.month} ${element.dayDate}, ${element.year}`
  });



  useEffect(() => {
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

    // Converts a month to number, and adds leading 0 if number is smaller than 10. ie August => 07
    // const monthToNum = months[dateArr[1]] < 10 ? '0'+months[dateArr[1]].toString() : months[dateArr[1]].toString()
    const currentDate = moment(new Date())
      .format("LLLL")
      .split(' ')
      .map(element => element.split('').filter(letter => letter !== ',' && letter)
      .join(''));

    const selectedMonthToNum = monthToNum(months, dateArr[1]);
    const currentMonthToNum = monthToNum(months, currentDate[1]);

    const selectedDateInt = parseInt(dateArr[3] + selectedMonthToNum + dateArr[2]);
    const currentDateInt = parseInt(currentDate[3] + currentMonthToNum + currentDate[2]);

    // Change edit button style is user selected the past date
    selectedDateInt < currentDateInt ? setEditBtnStyle(editBtnDisabled) : setEditBtnStyle(editBtnEnabled);
  }, [dateValue, restaurantBookings]);

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
                  <td>
                    <label
                      className={editBtnStyle}
                      htmlFor='UserBookingEditModal'
                      onClick={() => handleEditOnClick(element)
                      }
                    >
                        Edit
                    </label>
                  </td>
                </tr>
              )
            }) }
          </tbody>
        </table>
        {editInputObj.day && <UserBookingEditModal input={editInputObj}/>}
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
