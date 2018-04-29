import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticlesByCategory, fetchChoices } from '../store/userArticles'
import axios from "axios";

class UserArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            categories: [],
            keywords: []
        }
    }
    componentDidMount() {
        this.getChoices();
        this.props.getArticlesByCategory();
        // this.props.getArticlesByKeyword();
    }

    getChoices() {
        axios.get(`/api/choices/users/${this.props.user.id}`)
            .then(res => res.data)
            .then(choices => this.setState({
                country: choices.country,
                categories: choices.categories,
                keywords: choices.keywords
            })
        )
    }

    render() {
        console.log("PROPS!!", this.props)
        console.log("STATE", this.state)
        if(this.props.articlesByCategory){
            return (
                <div>
                    <h1>Articles By Category</h1>
                    {
                        this.props.articlesByCategory.map(article => {
                            return(
                                <div key={article.url}>
                                <h3>{article.title}</h3>
                                </div>
                            )
                        })
                    }
                    <hr />
                    <h1>Articles By Keyword</h1> 
                </div>
            )
        }
    }
}

const mapState = state => {
    return {
        articlesByCategory: state.articlesByCategory,
        articlesByKeyword: state.articlesByKeyword,
        user: state.user
        // categories: state.categories,
        // Keywords: state.Keywords
    }
}

const mapDispatch = dispatch => {
    return {
        getChoices: () => {
            dispatch(fetchChoices())
        },
        getArticlesByCategory: () => {
            dispatch(fetchArticlesByCategory('health', 'us'))
        },
        // getArticlesByKeyword: () => {
        //     dispatch(fetchArticlesByKeyword())
        // }
    }
}

export default connect(mapState, mapDispatch)(UserArticles)