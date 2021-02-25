// Imports
import React from 'react'
import { Form, Input } from 'formik-antd'

// UI
import { Button } from 'antd'

// App Imports
import { labelLayout } from './layout'

// Component
const LoginFormUI = () => {
  return (
    <Form name="login-form" className="login-form">
      {/* Email */}
      <Form.Item {...labelLayout} label="Username" name="username" required={true}>
        <Input name="username" autoComplete="username" />
      </Form.Item>
      {/* Password */}
      <Form.Item
        {...labelLayout}
        label="Password"
        name="password"
        required={true}
      >
        <Input.Password name="password" autoComplete="current-password" />
      </Form.Item>
      {/* Submit */}
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LoginFormUI
