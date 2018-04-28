import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticlesByCategory } from '../store/userArticles'

class UserArticles extends Component {
    componentDidMount() {
        this.props.getArticlesByCategory();
        // this.props.getArticlesByKeyword();
    }

    render() {
        console.log("PROPS!!", this.props)
        console.log("state articles!!", this.props.articlesByCategory)
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
        // categories: state.categories,
        // Keywords: state.Keywords
    }
}

const mapDispatch = dispatch => {
    return {
        getArticlesByCategory: () => {
            dispatch(fetchArticlesByCategory('health', 'us'))
        },
        // getArticlesByKeyword: () => {
        //     dispatch(fetchArticlesByKeyword())
        // }
    }
}

export default connect(mapState, mapDispatch)(UserArticles)