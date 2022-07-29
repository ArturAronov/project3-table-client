import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';

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
  )
}

const FileInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <div className='mx-2'>Upload restaurant's logo</div>
      <input
      {...field} {...props}
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
          turnaround: '',
          daysOperating: '',
          passwordHash: '',
        }}

        validationSchema={yup.object({
          firstName: yup.string()
            .required('First name is required.'),
          lastName: yup.string()
            .required('Last name is required.'),
          phone: yup.number()
            .typeError('Please enter a number.')
            .required('Phone number is required.'),
          email: yup.string()
            .email('Invalid email address')
            .required('Email is required.'),
          password: yup.string()
            .min(6)
            .required('Password is required'),
          passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Password must match')
            .required('Password confirmation is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(true);
          }, 400);

        }}
      >

        <Form>
          <MyTextInput
            name="restaurantName"
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
            name="openingHours"
            type="time"
            title="First Table"
          />

          <TimeInput
            name="closingHours"
            type="time"
            title="Last Table"
          />

          <button type="submit" className=" btn my-3 px-0 hero btn-outline btn-secondary ">Submit</button>
        </Form>
      </Formik>
    </>
  )
};

export default ComponentsRegistrationFormsRestaurants;
