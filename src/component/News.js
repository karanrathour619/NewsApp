import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'

export class News extends Component {

    // static defaultProps = {
    //     country: 'in',
    //     pageSize: 8,
    //     category: 'general'
    // }
    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string
    // }

    constructor(){
        super();
        console.log("Hello I'm a constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey72764a4390384d0086b8ed509fffe336&page=1&pageSize=${this.props.pageSize}`;
        try {
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    handlePrevClick = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey72764a4390384d0086b8ed509fffe336&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async() => {
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/20))){ 
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey72764a4390384d0086b8ed509fffe336&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
          <div className='container my-2'>
            <h2>NewsMonkey - Top Headlines</h2>
            {this.state.loading && <Spinner/>}
            <div className="row">
              {!this.state.loading && this.state.articles ? (
                this.state.articles.map((element) => (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                  </div>
                ))
              ) : (
                <p>No articles available</p>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
          </div>
        );
    }
}

export default News