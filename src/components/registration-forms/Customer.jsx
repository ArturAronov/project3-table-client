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

const ComponentsRegistrationFormCustomer = () => {
  return (
    <>
      <div className='text-center text-3xl m-5'>User</div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
          passwordConfirmation: '',
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
            name="firstName"
            type="text"
            placeholder="First name"
          />

          <MyTextInput
            name="lastName"
            type="text"
            placeholder="Last name"
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
            name="password"
            type="password"
            placeholder="Password"
          />

          <MyTextInput
            name="passwordConfirmation"
            type="password"
            placeholder="Password confirmation"
          />

          <button type="submit" className="btn btn-outline btn-secondary m-2 hero">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default ComponentsRegistrationFormCustomer;
