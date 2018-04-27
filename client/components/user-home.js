import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MainView from './mainView';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Hello, {email}</h3>
      <p>Here's the news based on your preferences</p>
      <MainView />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
