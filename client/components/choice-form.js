import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addChoices } from '../store/form'

class ChoiceForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            country: '',
            categories: [],
            keywords: [],
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleMultipleChange = this.handleMultipleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSelectChange(evt) {
        this.setState({
            country: evt.target.value,
        })
    }

    handleMultipleChange(evt) {
        this.setState({
            categories: [].slice.call(evt.target.selectedOptions).map(option => {
                return option.value;
            })
        })
    }

    handleTextChange(evt) {
        this.setState({
            keywords: evt.target.value.split(',')
        })
    }

    handleSubmit(evt) {
        evt.preventDefault();
        const choices = {
            country: this.state.country,
            categories: this.state.categories,
            keywords: this.state.keywords,
            userId: this.props.user.id
        }
        this.props.addChoices(choices, this.props)
    }

    render() {
        return (
            <div className="form">
                <div style={{color: 'green', margin: '10px'}}>{this.state.message}</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="select-style">
                        <label id="choiceLabel">
                            Select a Country
                            <select className="select" name="country" value={this.state.country} onChange={this.handleSelectChange}>
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
                            Pick Your Categories
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
                        <label id="choiceLabel">Add Your Choice of Keywords
                            <textarea value={this.state.keywords} onChange={this.handleTextChange} name="keywords" />
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

const mapDispatch = dispatch => {
  return {
    addChoices: (choices, props) => {
      dispatch(addChoices(choices, props))
    }
  }
}
//have a map dispatch submitChoice to the store
export default connect(mapState, mapDispatch)(ChoiceForm)
