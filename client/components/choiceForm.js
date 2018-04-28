import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from "axios";

export class ChoiceForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            country : '',
            categories: [],
            keywords: []
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    submitChoices(choices) {
        axios.post('/api/choices/users/:userId', choices)
            .then(res => res.data)
            .then(choices => {
                this.setState({
                    country: choices.country,
                    categories: choice.categories,
                    keywords: choice.keywords
                })
            })
            .catch(console.error)
    }

    handleSelectChange(e) {
        this.setState({
            country: e.target.value,
        })
    }

    handleCheckboxChange(e) {
        this.setState({
            categories: e.target.value,
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
            keywords: this.state.keywords
        }
        this.submitChoices(choices)
    }

    render() {
        console.log("STATE!!", this.state)
        return(
            <div>
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
                        <select multiple={true} value={this.state.categories} onChange={this.handleCheckboxChange}>
                        {
                            ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'].map(category => {
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
