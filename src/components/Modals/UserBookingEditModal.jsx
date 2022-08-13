import { useState, useEffect, useContext }  from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import moment from 'moment';

import TableContext from '../../context/TableContext';

const UserBookingEditModal = ({ input }) => {
  const { getAvailableTimeslots, maxCapacity, availableTimeslots, getUserBookings } = useContext(TableContext);

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

  const {
    id,
    restaurantId,
    daysOperating,
    time,
    year,
    month,
    dayDate,
  } = input;

  const badgeActive = "badge badge-outline m-1 p-3 w-14 cursor-pointer";
  const badgeInactive = "badge badge-accent m-1 p-3 w-14 cursor-pointer";

  const saveBtnEnabled = 'btn btn-outline btn-primary w-40 my-2';
  const saveBtnDisabled = 'btn btn-disabled w-40 my-2';

  const [ covers, setCovers ] = useState(input.covers);
  const [ timeSelected, setTimeSelected ] = useState(time);
  const [ dateValue, setDateValue ] = useState(new Date(year, months[month], dayDate));
  const [ submitData, setSubmitData ] = useState({});
  const [ editBtnStyle, setEditBtnStyle ] = useState(saveBtnDisabled);
  const [ timeslots, setTimeslots ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState(false);
  const [ daysOpen, setDaysOpen ] = useState([]);



  const parseCover = coversInput => {
    if(parseInt(coversInput) < 0) {
      setCovers(0);
    } else if(coversInput === ''){
      setCovers(0);
    } else {
      setCovers(parseInt(coversInput));
    };
  };

  const isRestaurantOpenOnSelectedDay = () => {
    const dayOfTheWeek = moment(dateValue).format('dddd');
    return daysOperating ? daysOperating.split(',').includes(dayOfTheWeek) : false;
  };

  const parseErrorMessages = () => {
    const currentDateInt = parseInt(moment(new Date()).format('Y') + moment(new Date()).format('MM') + moment(new Date()).format('DD'));
    const userInputDateInt = parseInt(moment(dateValue).format('Y') + moment(dateValue).format('MM') + moment(dateValue).format('DD'));

    if(covers === 0) {
      setErrorMessage(
        <div className='text-red-400 text-center text-sm'>
          Please enter covers.
        </div>
      );
    } else if (maxCapacity && covers > maxCapacity) {
      setErrorMessage(
        <div className='text-red-400 text-center text-sm'>
          Restaurant can't facilitate {covers} covers.
        </div>
      );
    } else if(currentDateInt > userInputDateInt) {
      setErrorMessage(
        <div className='text-red-400 text-sm text-center'>
          <div>
            Wait a minute, Doc.
          </div>
          <div>
            Are you telling me that you built a time machine...
          </div>
          <div>
            Out of a DeLorean?
          </div>
        </div>
        );
    } else if(!isRestaurantOpenOnSelectedDay()) {
      setErrorMessage(
        <div className='text-red-400 text-sm text-center'>
          Restaurant is closed on this day.
        </div>
      );
    } else {
      timeSelected === null ? setEditBtnStyle(saveBtnDisabled) : setEditBtnStyle(saveBtnEnabled);
      setErrorMessage(false);
    };
  };

  const resetStates = () => {
    setEditBtnStyle(saveBtnDisabled);
    setSubmitData({});
    setTimeslots([]);
    setErrorMessage(false);
  };

  const handleSubmitSave = () => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/booking/${id}`, submitData)
      .then(() => getUserBookings());
  };

  const handleDeleteBooking = () => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/booking/${id}`)
      .then(() => getUserBookings());
  };

  const displayTimeslots = async (dateInput) => {
    const dateArr = moment(dateInput)
      .format("LLLL")
      .split(' ')
      .map(element => element.split('')
      .filter(char => char !== ',' && char)
      .join(''));

    setSubmitData({
      day: dateArr[0],
      dayDate: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
      time: timeSelected,
      covers: parseInt(covers),
      ...submitData
    });

    const currentDateInt = parseInt(moment(new Date())
      .format('Y') + moment(new Date())
      .format('MM') + moment(new Date())
      .format('DD'));
    const userInputDateInt = parseInt(moment(dateInput)
      .format('Y') + moment(dateInput)
      .format('MM') + moment(dateInput)
      .format('DD'));
    const currentTimeInt = parseInt(moment(new Date())
      .format('HH:mm')
      .split(':')
      .join(''));

    const timeSlotsArr = await axios.get(`${process.env.REACT_APP_API_URL}/api/timeslots/${restaurantId}/${covers}/${dateArr[2]}/${dateArr[1]}/${dateArr[3]}`).then(res => res.data.tablesAvailable);

    // Return boolean if date selected is same as today's date
    const selectedToday = currentDateInt === userInputDateInt;

    // If date selected is today, return current time integer
    const currentTime = selectedToday ? currentTimeInt : 0;

    if(!selectedToday && covers > 0 && covers <= maxCapacity) {
      // Converts time integers into string ie 1200 -> 12:00
      setTimeslots(timeSlotsArr.map(element => {
          return element
            .toString()
            .split(' ')
            .map(string =>  {
              string.length === 3 && (string = 0 + string)
              return string.slice(0,2)+':'+string.slice(2, 4)
            })
            .join('')
            }
      ));
    } else if(selectedToday && covers  > 0 && covers <= maxCapacity) {
      console.log('here')
      setTimeslots(timeSlotsArr.filter(element => currentTime < element && element).map(element => {
        return element
            .toString()
            .split(' ')
            .map(string => {
              string.length === 3 && (string = 0 + string)
              return string.slice(0,2)+':'+string.slice(2, 4)
            })
            .join('')

      }));
    }
  };

  useEffect(() => {
    parseErrorMessages();

    input?.daysOperating && setDaysOpen(input.daysOperating.split(','));

    // setBookBtnStyle
    if(covers > maxCapacity) {
      setEditBtnStyle(saveBtnDisabled);
    } else if(covers < 1) {
      setEditBtnStyle(saveBtnDisabled);
    } else if (!timeSelected){
      setEditBtnStyle(saveBtnDisabled);
    } else if(!errorMessage) {
      setEditBtnStyle(saveBtnEnabled);
    } else {
      setEditBtnStyle(saveBtnEnabled);
    };

    const dateArr = moment(dateValue)
      .format("LLLL")
      .split(' ')
      .map(element => element.split('')
      .filter(char => char !== ',' && char)
      .join(''));

    setSubmitData({
      day: dateArr[0],
      dayDate: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
      ...(timeSelected !== '' && { time: timeSelected }),
      ...(covers > 0 && { covers: parseInt(covers) })
    });

  }, [dateValue, covers, timeSelected, maxCapacity, availableTimeslots, daysOperating]);

  return (
    <>
      <input className="modal-toggle h-screen"  type="checkbox" id="UserBookingEditModal"/>
      <div className="modal">
        <div className="modal-box">
          <div className='text-center'>
            <span className="py-4 text-3xl text-center">
              Edit Booking
            </span>
            <label
              onClick={() => resetStates()}
              htmlFor="UserBookingEditModal"
              className="btn btn-md btn-circle absolute right-4 top-4">
              ✕
            </label>
          </div>
          <Calendar
            className='text-center'
            value={dateValue}
            onChange={value => {
              setDateValue(value);
              displayTimeslots(value);
            }}
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
              } else if(!input?.daysOpen && isRestaurantOpenOnTheDay){
                return 'text-error font-bold w-10 h-10';
              } else {
                return 'w-10 h-10'
              }
            }}
          />

          <div className='flex justify-center m-5'>
            {`${submitData.day}
              -
              ${submitData.dayDate} / ${submitData.month} / ${submitData.year}`}
          </div>
          <label className="flex justify-center input-group">
            <span>Covers</span>
            <input
              value={covers}
              type="number"
              className="input input-bordered w-24 focus:outline-none"
              onChange={e => {
                setTimeSelected(null);
                parseCover(e.target.value);

                // If covers are bigger than max capacity, covers are smaller than 1 or no covers are entered, disable the Edit button.
                (parseInt(e.target.value) > maxCapacity ||
                parseInt(e.target.value) < 1 ||
                e.target.value === '' ) ?
                setEditBtnStyle(saveBtnDisabled) :
                setEditBtnStyle(saveBtnEnabled);

                // If covers are smaller than 1 or no covers are entered, don't send the request.
                (parseInt(e.target.value) > 0 && e.target.value !== '') &&
                getAvailableTimeslots(restaurantId, e.target.value, submitData.dayDate, submitData.month, submitData.year);
                displayTimeslots(dateValue);
              }}/>
          </label>

          <div className='my-3 flex justify-center flex-wrap'>
            {
              errorMessage ?
              errorMessage :
              timeslots.map(element => {
                return (
                  <div
                  key={element}
                  className={element === timeSelected ? badgeInactive : badgeActive}
                  onClick={() => setTimeSelected(element)}
                >
                  { element }
                </div>
                )
              })
            }
          </div>

          <div className='flex justify-evenly'>
            <label
              className="btn btn-outline btn-error w-40 my-2"
              htmlFor="UserBookingEditModal"
              onClick={() => handleDeleteBooking()}
            >
              Cancel Booking
            </label>

            <label
              className={editBtnStyle}
              htmlFor="UserBookingEditModal"
              onClick={() => handleSubmitSave()}
            >
              Save Changes
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookingEditModal;
