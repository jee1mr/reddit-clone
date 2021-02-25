// Imports
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

// App Imports
import Login from 'modules/Login'
import RequireAuth from 'modules/Auth/RequireAuth'
import BoardList from './modules/Board/BoardList';
import './style.css'


// React Query Init
export const queryClient = new QueryClient()


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Route exact path="/" component={Login} />
        <Route
          exact
          path="/boardList"
          component={RequireAuth(BoardList, 'user')}
        />
        {/* <Route
          exact
          path="/board/:boardId"
          component={RequireAuth(BoardDetail, 'user')}
        /> */}
      </Router>
    </QueryClientProvider>
  )
}

export default App
