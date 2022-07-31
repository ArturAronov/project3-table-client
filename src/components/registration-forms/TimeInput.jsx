import { useField } from 'formik';

const TimeInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
  <div className='w-80'>
      <div className='mx-2'>{props.title}</div>
      <input autoComplete="off" className="m-2 input input-bordered w-full max-w-xs" {...field} {...props} />
      {meta.touched && meta.error ? (
          <div className="error text-red-400 text-sm mx-3">{meta.error}</div>
        ) : null}
    </div>
  );
};

export default TimeInput;
