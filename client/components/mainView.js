import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllArticles } from "../store/mainView";
import axios from "axios";

class MainView extends Component {

    componentDidMount() {
        this.props.getTopArticlesUS();
    }

    render() {
        console.log("PROPS!!", this.props)
        console.log("state articles!!", this.props.articles)
        if(this.props.articles) {
            return(
                <div>
                    {
                        this.props.articles.map(article => {
                            return (
                            <div key={article.url}>
                                <h3>title: {article.title}</h3>
                            </div>
                            )
                        })
                    }
                   
                </div>
            )
        } else {
            return <p>Loading ...</p>
        }
    }
}

const mapState = state => {
    return {
        articles: state.articles
    }
}

const mapDispatch = dispatch => {
    return {
        getTopArticlesUS: () => {
            dispatch(fetchAllArticles())
        }
    }
}

export default connect(mapState, mapDispatch)(MainView)