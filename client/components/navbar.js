import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Link to='/home'  className="logo"><i id="icon" className="far fa-newspaper fa-3x">NewsMine</i></Link>
    <nav>
      {isLoggedIn &&  
        <div id="nav">
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="navLink">Home</Link>
          <Link to="/update-form" className="navLink">My Preferences</Link>
          <Link to="#" onClick={handleClick} className="navLink">Logout</Link>
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
