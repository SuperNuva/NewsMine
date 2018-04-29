import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from "axios";

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
        console.log("STATE!!", this.state)
        console.log("PROPS!!", this.props)
        return(
            <div>
                <div>{this.state.message}</div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Select a country  
                        <select name='country' value={this.state.country} onChange={this.handleSelectChange}>
                            <option value="au">Australia</option>
                            <option value="br">Brazil</option>
                            <option value="ca">Canada</option>
                            <option value="cn">China</option>
                            <option value="de">Germany</option>
                            <option value="in">India</option>
                            <option value="kr">Korea, Republic of</option>
                            <option value="za">South Africa</option>
                            <option value="uk">United Kingdom</option>
                            <option value="us">United States of America</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        select your categories
                        <select multiple={true} value={this.state.categories} onChange={this.handleMultipleChange}>
                        {
                            ['business', 'entertainment', 'health', 'science', 'sports', 'technology'].map(category => {
                                return (
                                    <option key={category} value={category}>{category}</option>
                                )
                            })
                        }
                        </select>
                    </label>
                    <label>What do you care about the most?
                        <textarea value={this.state.keywords} onChange={this.handleTextChange} name='keywords'/>
                    </label>
                    <br />
                    <button type="submit">Save</button>
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

export default connect(mapState)(ChoiceForm)