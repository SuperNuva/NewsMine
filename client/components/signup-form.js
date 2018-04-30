import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const SignupForm = (props) => {
  const {name, handleSubmit, error} = props

  return (
    <div className="form">
        <ul className="tab-group">
            <li className="tab active"><Link to="/signup" id="a">Sign Up</Link></li>
            <li className="tab"><Link to="/login" id="a">Log In</Link></li>
        </ul>
        <div className="tab-content">
            <div id="login">
            <h1>Sign Up for Free!</h1>
                <form onSubmit={handleSubmit} name={name}>
                    <div className="field-wrap">
                        <label id="signLabel" htmlFor="fullName">Full Name<span className="req">*</span></label>
                        <input name="fullName" type="text" />
                    </div>
                    <div className="field-wrap">
                        <label id="signLabel" htmlFor="email">Email Address<span className="req">*</span></label>
                        <input name="email" type="email" />
                    </div>
                    <div className="field-wrap">
                        <label id="signLabel" htmlFor="password">Set a Password<span className="req">*</span></label>
                        <input name="password" type="password" />
                    </div>
                    <div>
                        <button type="submit" className="button button-block">Get Started</button>
                    </div>
                        {error && error.response && <div style={{color:'red'}}> {error.response.data} </div>}
                </form>
            </div>
        </div>
    </div>
  )
}

const mapSignup = (state) => {
    return {
      name: 'signup',
      error: state.user.error
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit (evt) {
            evt.preventDefault()
            const fullName = evt.target.fullName.value
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(signup(fullName, email, password,))
        }
    }
}

export const Signup = connect(mapSignup, mapDispatch)(SignupForm)

SignupForm.propTypes = {
    name: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
}  