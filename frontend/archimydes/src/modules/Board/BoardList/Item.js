// Imports
import React from 'react'
import { queryClient } from 'App'

// UI
import { Card, Button, Tag } from 'antd'
import api from 'setup/api'
import { apiUrl } from 'setup/helpers'
import routesApi from 'setup/routesApi'

// Component
const BoardItem = ({ board }) => {
  // Become Member
  const becomeMember = async () => {
    const { data } = await api.post(
      apiUrl(routesApi.board.becomeMember(board.id)),
    )
    // Reload board list on success
    if (data && data.success) {
      queryClient.invalidateQueries('boardList')
    }
  }

  return (
    <Card style={{ width: 300 }} hoverable>
      <h1>{board.name}</h1>
      {/* Member */}
      {board.is_member && !board.is_banned && !board.is_moderator ? (
        <Tag color="#2db7f5">Member</Tag>
      ) : null}
      {/* Moderator */}
      {board.is_moderator ? <Tag color="#2db7f5">Moderator</Tag> : null}
      {/* Banned */}
      {board.is_banned ? <Tag color="#f50">Banned</Tag> : null}
      {/* Join Button */}
      {!board.is_banned && !board.is_member && !board.is_moderator ? (
        <Button type="primary" size="small" onClick={becomeMember}>
          + Join
        </Button>
      ) : null}
    </Card>
  )
}

export default BoardItem
