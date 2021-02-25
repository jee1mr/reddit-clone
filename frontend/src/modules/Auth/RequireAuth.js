import React from 'react'

const RequireAuth = (Component, requiredRole) => {
  return class App extends React.Component {
    componentWillMount() {
      const user = localStorage.getItem('user')
      if (!user) {
        this.props.history.replace({ pathname: '/' })
      }
    }
    render() {
      return <Component {...this.props} />
    }
  }
}

export default RequireAuth
