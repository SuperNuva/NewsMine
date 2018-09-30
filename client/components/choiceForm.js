import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from "axios";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';

class ChoiceForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            country : '',
            categories: [],
            keywords: [],
            message: ''
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleMultipleChange = this.handleMultipleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    submitChoices(choices) {
        axios.post(`/api/choices/users/${this.props.user.id}`, choices)
            .then(res => res.data)
            .then(choices => {
                this.setState({
                    country: choices.country,
                    categories: choices.categories,
                    keywords: choices.keywords,
                    message: 'Your choices are saved successfully!'
                })
            })
            .catch(console.error)
    }

    handleSelectChange(e) {
        this.setState({
            country: e.target.value,
        })
    }

    handleMultipleChange(e) {
        this.setState({
            categories:[].slice.call(e.target.selectedOptions).map(option => {
                return option.value;
            })
        })
    }

    handleTextChange(e) {
        this.setState({
            keywords: e.target.value.split(',')
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const choices = {
            country: this.state.country,
            categories: this.state.categories,
            keywords: this.state.keywords,
            userId: this.props.user.id
        }
        this.submitChoices(choices)

    }

    render() {
        return(
            <div className="form">
                <div style={{color: 'green', margin:'10px'}}>{this.state.message}</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="select-style">
                        <label id="choiceLabel">
                            Select a Country  
                            <select className="select" name='country' value={this.state.country} onChange={this.handleSelectChange}>
                                <option default>Select...</option>
                                <option value="au">Australia</option>
                                <option value="br">Brazil</option>
                                <option value="ca">Canada</option>
                                <option value="cn">China</option>
                                <option value="de">Germany</option>
                                <option value="in">India</option>
                                <option value="kr">Korea, Republic of</option>
                                <option value="za">South Africa</option>
                                <option value="gb">United Kingdom</option>
                                <option value="us">United States of America</option>
                            </select>
                        </label>
                    </div>
                        <br />
                    <div>
                        <label id="choiceLabel">
                            Choose News Categories
                            <select className="select" multiple={true} value={this.state.categories} onChange={this.handleMultipleChange}>
                            {
                                ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'].map(category => {
                                    return (
                                        <option key={category} value={category}>{category}</option>
                                    )
                                })
                            }
                            </select>
                        </label>
                    </div>
                        <br />
                    <div>
                        <label id="choiceLabel">What's a topic you want to read about?
                            <textarea value={this.state.keywords} onChange={this.handleTextChange} name='keywords'/>
                        </label>
                    </div>
                        <br />
                    <button className="saveButton" type="submit">Save</button>
                </form>
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.user
    }
}
//have a map dispatch submitChoice to the store
export default connect(mapState)(ChoiceForm)