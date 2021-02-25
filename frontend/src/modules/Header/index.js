// Imports
import React from 'react'

// App Imports
import Logout from 'modules/Auth/Logout'
import CreateBoard from 'modules/Board/BoardCreate'
import './style.css'

// Component
const Header = () => {
  return (
    <div className="header">
      {/* <CreateBoard /> */}
      <Logout />
    </div>
  )
}

export default Header
