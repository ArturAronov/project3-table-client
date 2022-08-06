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

  const yearInt = parseInt(input.year);
  const monthInt = months[input.month];
  const dayInt = parseInt(input.dayDate);

  const badgeActive = "badge badge-outline m-1 p-3 cursor-pointer";
  const badgeInactive = "badge badge-accent m-1 p-3 cursor-pointer";

  const saveBtnEnabled = 'btn btn-outline btn-primary w-40 my-2';
  const saveBtnDisabled = 'btn btn-disabled w-40 my-2';

  const [ editBtnStyle, setEditBtnStyle ] = useState(saveBtnDisabled);
  const [ dateValue, setDateValue ] = useState(new Date(yearInt, monthInt, dayInt));
  const [ submitData, setSubmitData ] = useState({});
  const [ timeSelected, setTimeSelected ] = useState(input.time);
  const [ covers, setCovers ] = useState(input.covers);
  const [ timeslots, setTimeslots ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(false);

  const parseCover = input => {
    if(parseInt(input) < 0) {
      setCovers(0);
    } else if(input === ''){
      setCovers(0);
    } else {
      setCovers(parseInt(input));
    };
  };

  const isRestaurantOpenOnSelectedDay = () => {
    const dayOfTheWeek = moment(dateValue).format('dddd');
    return input.daysOperating ?  input.daysOperating.split(',').includes(dayOfTheWeek) : false;
  };

  const parseErrorMessages = () => {
    const currentDateInt = parseInt(moment(new Date()).format('Y') + moment(new Date()).format('MM') + moment(new Date()).format('DD'));
    const userInputDateInt = parseInt(moment(dateValue).format('Y') + moment(dateValue).format('MM') + moment(dateValue).format('DD'));

    if(covers === 0) {
      setEditBtnStyle(saveBtnDisabled);
      setErrorMessage(
        <div className='text-red-400 text-center text-sm'>
          Please enter covers.
        </div>
      );
    } else if (maxCapacity && covers > maxCapacity) {
      setEditBtnStyle(saveBtnDisabled);
      setErrorMessage(
        <div className='text-red-400 text-center text-sm'>
          Restaurant can't facilitate {covers} covers.
        </div>
      );
    } else if(currentDateInt > userInputDateInt) {
      setEditBtnStyle(saveBtnDisabled);
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
      setEditBtnStyle(saveBtnDisabled);
      setErrorMessage(
        <div className='text-red-400 text-sm text-center'>
          Restaurant is closed on this day.
        </div>
      );
    } else {
      timeSelected === null ? setEditBtnStyle(saveBtnDisabled) : setEditBtnStyle(saveBtnEnabled);
      setErrorMessage(null);
    };
  };

  const resetStates = () => {
    setEditBtnStyle(saveBtnDisabled);
    setSubmitData({});
    setTimeslots('');
    setErrorMessage(false);
  };

  const handleSubmitSave = () => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/booking/${input.id}`, submitData)
      .then(() => getUserBookings());
  };

  const handleDeleteBooking = () => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/api/user/booking/${input.id}`)
      .then(() => getUserBookings());
  };

  const displayTimeslots = () => {
    const currentDateInt = parseInt(moment(new Date()).format('Y') + moment(new Date()).format('MM') + moment(new Date()).format('DD'));
    const userInputDateInt = parseInt(moment(dateValue).format('Y') + moment(dateValue).format('MM') + moment(dateValue).format('DD'));
    const currentTimeInt = parseInt(moment(new Date()).format('HH:mm').split(':').join(''));

    const verifyCurrentDate = () => {
      if( currentDateInt === userInputDateInt) {
        return currentTimeInt;
      };
      return 0;
    };

    if(covers > 0 && covers <= maxCapacity && isRestaurantOpenOnSelectedDay()) {
      setTimeslots(availableTimeslots.map(element => {
        const timeToString =  element
        .toString()
        .split(' ')
        .map(string => string.slice(0,2)+':'+string.slice(2, 4))
        .join('');

        return (
          verifyCurrentDate() < element && <div
            key={element}
            className={timeToString === timeSelected ? badgeInactive : badgeActive}
            onClick={() => setTimeSelected(timeToString)}
          >
            { timeToString }
          </div>
          );
      }));
    };
  };

  useEffect(() => {
    parseErrorMessages();
    displayTimeslots();

    const dateArr = moment(dateValue).format("LLLL").split(' ').map(element => element.split('').filter(char => char !== ',' && char).join(''));

    setSubmitData({
      day: dateArr[0],
      dayDate: dateArr[2],
      month: dateArr[1],
      year: dateArr[3],
      ...(timeSelected !== '' && { time: timeSelected }),
      ...(covers > 0 && { covers: parseInt(covers) })
    });

    getAvailableTimeslots(input.id, covers, dateArr[2], dateArr[1], dateArr[3]);
  }, [dateValue, covers, timeSelected, maxCapacity]);

  return (
    <>
      <input className="modal-toggle h-screen"  type="checkbox" id="UserBookingEditModal"/>
      <div className="modal">
        <div className="modal-box">
          <p className="py-4 text-3xl text-center">Edit Booking</p>
          <Calendar
            className='text-center'
            value={dateValue}
            onChange={value => {
              setDateValue(value);
              setTimeSelected(null);
              const dateArr = moment(value).format("LLLL").split(' ').splice(0, 4).map(element => element.split('').filter(letter => letter !== ',' && letter).join(''));

              setSubmitData({
                day: dateArr[0],
                dayDate: dateArr[2],
                month: dateArr[1],
                year: dateArr[3],
                time: timeSelected,
                covers,
              });

              getAvailableTimeslots(input.restaurantId, covers, dateArr[2], dateArr[1], dateArr[3]);
              displayTimeslots();
            }
          }
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
                // If covers are smaller than 1 or no covers are entered, don't send the request.
                (parseInt(e.target.value) > 0 && e.target.value !== '') &&
                getAvailableTimeslots(input.restaurantId, e.target.value, submitData.dayDate, submitData.month, submitData.year);
              }}/>
          </label>

          <div className='my-3 flex justify-center flex-wrap'>
            { errorMessage ? errorMessage : timeslots }
          </div>

          <div>
            <div className='flex justify-center'>
              <label
                className="btn btn-outline btn-error w-40 my-2"
                htmlFor="UserBookingEditModal"
                onClick={() => handleDeleteBooking()}
              >
                Cancel Booking
              </label>
            </div>


            <div className='flex justify-center'>
              <label
                className={editBtnStyle}
                htmlFor="UserBookingEditModal"
                onClick={() => handleSubmitSave()}
              >
                Save Changes
              </label>
            </div>

            <div  className='flex justify-center'>
              <label
                className="btn btn-outline btn-accent  w-40 my-2"
                htmlFor="UserBookingEditModal"
                onClick={() => resetStates()}
              >
                Exit
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookingEditModal;
