import React, { useState, useEffect } from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div>
      <input autoComplete="off" className="m-2 input input-bordered w-full max-w-xs" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-red-400 text-sm mx-3">{meta.error}</div>
      ) : null}
    </div>
  );
};

const TimeInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
  <div>
      <div className='mx-2'>{props.title}</div>
      <input autoComplete="off" className="m-2 input input-bordered w-full max-w-xs" {...field} {...props} />
      {meta.touched && meta.error ? (
          <div className="error text-red-400 text-sm mx-3">{meta.error}</div>
        ) : null}
    </div>
  );
};

const Turnaround = ({ label, ...props }) => {
  const [val, setVal] = useState(180);
  const [timeUnit, setTimeUnit] = useState('minutes');

  const [field, meta] = useField(props);

  const handleChange = e => {
    const currentValue = parseInt(e.target.value)
    setVal(currentValue)
  }

  useEffect(() => {
    if(val >= 120) {
      return setTimeUnit('hours')
    } else if(val >= 60) {
      return setTimeUnit('hour')
    } else {
      return setTimeUnit('minutes')
    }
  }, [val])

  return (
    <div>
      <div className='mx-2'>
        Table turnaround time {parseInt(val / 60) > 0 && parseInt(val / 60) + ':'}
        {val % 60 ? val % 60 : "00"} {timeUnit}
      </div>
      <input
        min="30"
        max="360"
        value={val}
        className="range"
        step="15"
        {...field}
        {...props}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-400 text-sm mx-3">{meta.error}</div>
      ) : null}
    </div>
  );
};

const FileInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const onChange = (e) => {
    helpers.setValue(e.target.files[0]);
  }

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

const ComponentsRegistrationFormsRestaurants = () => {
  return (
    <>
      <div className='text-center text-3xl m-5'>Restaurant</div>
      <Formik
        initialValues={{
          name: '',
          phone: '',
          email: '',
          building: '',
          street: '',
          city: '',
          country: '',
          zipCode: '',
          logo: '',
          open: '',
          close: '',
          // turnaround: 180,
          // daysOperating: '',
          password: '',
          passwordConfirmation: '',
        }}

        validationSchema={yup.object({
          name: yup.string()
            .required('Restaurant\'s name is required'),
          phone: yup.number()
            .typeError('Please enter a number.')
            .required('Phone number is required.'),
          email: yup.string()
            .email('Invalid email address')
            .required('Email is required.'),
          building: yup.string(),
          street: yup.string()
            .required('Street name & number are required'),
          city: yup.string()
            .required('City is required.'),
          country: yup.string()
            .required('Country is required.'),
          zipCode: yup.string()
            .required('Zip code is required.'),
          logo: yup.mixed(),
          open: yup.string()
            .required('Please select opening time.'),
          close: yup.string()
            .required('Please select time for last table.'),
          turnaround: yup.number(),
          // daysOperating: yup.string(),
          password: yup.string()
            .min(6)
            .required('Password is required.'),
          passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('Password confirmation is required.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
          setTimeout(() => {
            const data = new FormData()

            for(let i in values) {
              data.append(i, values[i])
            }

            for (var pair of data.entries()) {
              console.log(pair[0]+ ', ' + pair[1]);
            }

            axios
              .post('http://localhost:5000/api/business/auth/signup', data)
              .catch(err => {
            })
            // alert(JSON.stringify(values, null, 2));
            // alert(data);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            name="name"
            type="text"
            placeholder="Restaurant's name"
          />

          <MyTextInput
            name="phone"
            type="text"
            placeholder="Phone number"
          />

          <MyTextInput
            name="email"
            type="email"
            placeholder="E-mail"
          />

          <MyTextInput
            name="building"
            type="text"
            placeholder="Building name"
          />

          <MyTextInput
            name="street"
            type="text"
            placeholder="Street name & number"
          />

          <MyTextInput
            name="city"
            type="text"
            placeholder="City"
          />

          <MyTextInput
            name="country"
            type="text"
            placeholder="Country"
          />

          <MyTextInput
            name="zipCode"
            type="text"
            placeholder="Zip Code"
          />

          <FileInput
            name="logo"
            type="file"
          />

          <MyTextInput
            name="password"
            type="password"
            placeholder="Password"
          />

          <MyTextInput
            name="passwordConfirmation"
            type="password"
            placeholder="Password Confirmation"
          />

          <TimeInput
            name="open"
            type="time"
            title="First Table"
          />

          <TimeInput
            name="close"
            type="time"
            title="Last Table"
          />

          <Turnaround
            name="turnaround"
            type="range"
          />

          <button type="submit" className=" btn my-3 px-0 hero btn-outline btn-secondary ">Submit</button>
        </Form>

      </Formik>
    </>
  )
};

export default ComponentsRegistrationFormsRestaurants;
