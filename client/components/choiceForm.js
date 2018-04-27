import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class ChoiceForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            country : '',
            categories: [],
            keywords: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    submitChoices(choices) {
        axios.post('/api/choices', choices)
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

    handleChange(e) {
        this.setState({[e.taget.name]: e.target.value})
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
        return(
            <div>
                <form>
                    <label>
                        Select a country  
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
                    <br />
                    <label>
                        Pick your categories
                        {
                            ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'].map(category => {
                                return (
                                    <div key={category}>
                                        <label><input type="checkbox" name={category} />{category}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </label>
                    <label>What do you care about the most?
                        <textarea value={this.state.value} onChange={this.handleChange} name='keywords'/>
                    </label>
                    <br />
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}
