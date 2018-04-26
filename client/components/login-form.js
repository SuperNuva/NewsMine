import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const LoginForm = (props) => {
  const {name, handleSubmit, error} = props

  return (
    <div>
        <ul className="tab-group">
            <li className="tab active"><Link to="/signup">Sign Up</Link></li>
            <li className="tab"><Link to="/login">Log In</Link></li>
        </ul>
        <div className="tab-content">
            <div id="login">   
                <h1>Welcome Back!</h1>
                <form onSubmit={handleSubmit} name={name}>
                    <div className="field-wrap">
                        <label>Email Address<span className="req">*</span></label>
                        <input name="email" type="email"/>
                    </div>
                    
                    <div className="field-wrap">
                        <label>Password<span className="req">*</span></label>
                        <input name="password" type="password"/>
                    </div>
                    
                    <p className="forgot"><Link to="#">Forgot Password?</Link></p>
                    
                    <button type="submit" className="button button-block">Log In</button>
                </form>
            </div> 
        </div>
    </div>
    )
}

const mapLogin = (state) => {
    return {
      name: 'login',
      error: state.user.error
    }
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit (evt) {
            evt.preventDefault()
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(login(email, password))
        }
    }
}

export const Login = connect(mapLogin, mapDispatch)(LoginForm)

LoginForm.propTypes = {
    name: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.object
}  