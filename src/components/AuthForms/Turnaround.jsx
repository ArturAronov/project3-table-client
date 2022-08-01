import { useState, useEffect } from 'react';
import { useField } from 'formik';

const Turnaround = ({ label, ...props }) => {
  const [val, setVal] = useState(180);
  const [timeUnit, setTimeUnit] = useState('minutes');

  const [field, meta, helpers] = useField(props);

  const handleChange = e => {
    const currentValue = parseInt(e.target.value);
    setVal(currentValue);
    helpers.setValue(currentValue);
  };

  useEffect(() => {
    if(val >= 120) {
      return setTimeUnit('hours')
    } else if(val >= 60) {
      return setTimeUnit('hour')
    } else {
      return setTimeUnit('minutes')
    }
  }, [val]);

  return (
    <div className='mx-2'>
      <div className='m-2'>
        Table turnaround time {parseInt(val / 60) > 0 && parseInt(val / 60) + ':'}
        {val % 60 ? val % 60 : "00"} {timeUnit}
      </div>
      <input
        min="30"
        max="360"
        value={val}
        className="range"
        step="15"
        // {...field}
        {...props}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-400 text-sm mx-3">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Turnaround;
