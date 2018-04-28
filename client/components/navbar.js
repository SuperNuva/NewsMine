import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>NewsRoom</h1>
    <nav>
      {isLoggedIn &&  
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">My NewsRoom</Link>
          <Link to="/account-settings">My Account</Link>
          <Link to="#" onClick={handleClick}>
          <Link to="/top-news">Top Headlines</Link>
            Logout
          </Link>
        </div>
      }
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
