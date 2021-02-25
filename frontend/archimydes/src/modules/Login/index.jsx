// Imports
import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

// UI
import { Card, message } from 'antd'
import { useHistory } from 'react-router-dom'

// App Imports
import './style.scss'
import LoginFormUI from './FormUI'
import routesApi from 'setup/routesApi'
import { apiUrl } from 'setup/helpers'
import useUser from 'modules/Auth/useUser'

const Login = () => {
  // State
  const [user, setUser] = useUser()
  const history = useHistory()

  // Check logged in status
  useEffect(() => {
    if (user) {
      history.push('/boardList')
    }
  }, [user, history])

  // Schema
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter your username'),
    password: yup.string().required('Please enter your password'),
    isAdmin: yup.bool().required('Please select a role'),
  })
  // Form Submission
  const onSubmit = async (formData) => {
    console.log(formData)
    try {
      const { data } = await axios.post(apiUrl(routesApi.login.path), formData)
      if (data) {
        setUser(data)
      }
    } catch (error) {
      console.error(error)
      message.error('Login failed. Try again', 1)
    }
  }

  return (
    <Card className="login-card" title="Log in">
      <Formik
        validationSchema={schema}
        initialValues={{ email: '', password: '', isAdmin: false }}
        onSubmit={onSubmit}
      >
        <LoginFormUI />
      </Formik>
    </Card>
  )
}

export default Login
