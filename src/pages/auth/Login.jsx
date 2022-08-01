import { useState, useContext } from 'react';
import * as yup from 'yup';

import { Formik, Form } from 'formik';
import TextInput from '../../components/AuthForms/TextInput';
import TableContext from '../../context/TableContext';

const PagesAuthLogin = () => {
  const [toggle, setToggle] = useState(true);
  const { authUserLogin, authBusinessLogin } = useContext(TableContext);
  const handleToggleClick = () => {
    return setToggle(!toggle)
  }

  return (
    <div className='hero-content'>
      <div>
        <div className='text-center text-4xl'>
          Login
        </div>
        <div className='text-center mt-5'>
          Select your portal
        </div>
        <div className="form-control w-auto hero-content my-2 p-0">
          <label className="label cursor-pointer">
            <span className="label-text mx-3">Customer</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              onChange={handleToggleClick}
              checked={toggle}
            />
            <span className="label-text mx-3">Restaurant</span>
          </label>
        </div>
        <div className='my-5'>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}

        validationSchema={yup.object({
          email: yup.string()
            .email('Invalid email address')
            .required('Email is required.'),
          password: yup.string()
            .min(6)
            .required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const data = new FormData();

            for(let i in values) {
              data.append(i, values[i])
            };

            toggle ? authBusinessLogin(data) : authUserLogin(data)

            setSubmitting(false);
          }, 400)

        }}
      >

        <Form>
          <TextInput
            name="email"
            type="email"
            placeholder="E-mail"
          />

          <TextInput
            name="password"
            type="password"
            placeholder="Password"
          />

          <button type="submit" className="btn btn-outline btn-secondary m-2 hero">Login</button>
        </Form>
      </Formik>
    </div>
      </div>

    </div>
  );
};

export default PagesAuthLogin;
