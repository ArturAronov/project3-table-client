import { useState, useEffect } from 'react';
import { useField } from 'formik';

const DaysOperatingInput = ({ label, ...props }) => {
  const [days, setDays] = useState([]);
  const [field, meta, helpers] = useField(props);
  const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayActive = "badge badge-accent p-3 w-24 m-1 cursor-pointer";
  const dayInactive = "badge badge-accent badge-outline p-3 w-24 m-1 cursor-pointer";

  const handleClick = input => {
    if (!days.includes(input)) {
      setDays([...days, input])
    } else {
      const filteredDays = days.filter(element => element !== input);
      setDays(filteredDays)
    }
  };

  useEffect(() => {
    helpers.setValue(days.join(','));
  }, [days])

  return (
    <div className='mx-2 my-3 w-80' {...props}>
      <div className='my-2'>
        Select business opening days
      </div>
      <div className='justify-center flex flex-row flex-wrap'>
        {daysArr.map(element => {
          return <div
          key={element}
          className={days.includes(element) ? dayActive : dayInactive}
          onClick={() => handleClick(element)}>
            {element}
        </div>
        })}
      </div>

      {meta.touched && meta.error ? (
        <div className="error text-red-400 text-sm mx-3 cursor-pointer">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DaysOperatingInput;
