// Imports
import React from 'react'
import { useQuery } from 'react-query'

// UI
import { Empty, Skeleton, Result, Card } from 'antd'

// App Imports
import './style.scss'
import api from 'setup/api'
import { apiUrl } from 'setup/helpers'
import routesApi from 'setup/routesApi'
import Header from 'modules/Header'
import BoardItem from './Item'

const BoardList = () => {
  // Fetch Board List
  const { isLoading, error, data } = useQuery('boardList', () =>
    api.get(apiUrl(routesApi.board.list)),
  )

  // Error
  if (error)
    return (
      <>
        <Header />
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      </>
    )

  // Loading
  if (isLoading)
    return (
      <>
        <Header />
        <Card>
          <Skeleton />
        </Card>
      </>
    )

  // No Data
  if (!data) {
    return (
      <>
        <Header />
        <Empty />
      </>
    )
  }

  // Result
  return (
    <>
      <Header />
      <div className="board-list-container">
        {data.data.map((board) => (
          <BoardItem board={board} key={board.id} />
        ))}
      </div>
    </>
  )
}

export default BoardList
