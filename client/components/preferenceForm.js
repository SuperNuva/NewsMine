import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class PreferenceForm extends Component {
    constructor(props){
        super(props)
    }

    render() {
        <div>
            <form>
                <label>Select a country
                    <select>
                        <option>Australia</option>
                        <option>Brazil</option>
                        <option>Canada</option>
                        <option>China</option>
                        <option>Germany</option>
                        <option>India</option>
                        <option>Korea, Republic of</option>
                        <option>South Africa</option>
                        <option>United Kingdom</option>
                        <option>United States of America</option>
                    </select>
                </label>
            </form>
        </div>
    }
}
