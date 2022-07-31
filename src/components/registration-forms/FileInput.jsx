import React from 'react';
import { useField } from 'formik';

const FileInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const onChange = e => {
    helpers.setValue(e.target.files[0]);
  };

  return (
    <div>
      <div className='mx-2'>Upload restaurant's logo</div>
      <input
        {...props}
        onChange={onChange}
        className="
          m-2 input input-bordered max-w-xs
          text-sm text-slate-500
          file:mr-3 file:py-2 file:px-4 file:my-1
          file:rounded-md file:border-0
          hover:file:bg-violet-100
        "
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-400 text-sm mx-3">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FileInput;
