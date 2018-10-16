import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserArticles} from '../components'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {name} = props
  return (
    <div id="userHome">
      <h3>Hello, {name} ...</h3>
      <p>Here's the news based on your preferences</p>
      <UserArticles />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    name: state.user.fullName.split(" ")[0]
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}
