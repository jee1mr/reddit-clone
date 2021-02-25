// Imports
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'

// UI
import { Form, Input } from 'formik-antd'
import { Button, message } from 'antd'

// App Imports
import './style.scss'
import api from 'setup/api'
import { apiUrl } from 'setup/helpers'
import routesApi from 'setup/routesApi'
import { queryClient } from 'App'

const StoryCreate = () => {
  const history = useHistory()
  // Schema
  const schema = yup.object().shape({
    name: yup.string().required('Please enter a board name'),
  })
  // Form Submission
  const onSubmit = async (formData) => {
    try {
      const { data, status } = await api.post(
        apiUrl(routesApi.board.path),
        formData,
      )

      message.loading({
        content: 'Creating board...',
        key: 'createBoard',
      })

      if (status === 200) {
        console.log('Created')
        queryClient.invalidateQueries('boardList')
        message.success({
          content: `Successfully created ${data.name}`,
          key: 'createBoard',
          duration: 2,
        })
        // history.push(`/board/${board.id}`)
      }
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        name: '',
      }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form name="board-create-form" layout="inline">
        <Form.Item name="name" required={true}>
          <Input
            name="name"
            placeholder="Enter board name"
            autoComplete="off"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          + Create Board
        </Button>
      </Form>
    </Formik>
  )
}

export default StoryCreate
