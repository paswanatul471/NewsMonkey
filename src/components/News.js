import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Gif from './Gif';
import Proptypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general',

  }
  static propTypes = {
    country: Proptypes.string,
    pageSize: Proptypes.number,
    category: Proptypes.string

  }

  articles = []
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("I am a constructor from news");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      toUpperCase:0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMokey`;
  }
  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12b57f3f5a6b4ba0a04e4df8a2627c02&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(50);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updateNews();
  }
  handlePrevclick = async () => {

    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }
  handleNextclick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews();

  }
  fetchData = async() =>{
    this.setState({page: this.state.page +1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=12b57f3f5a6b4ba0a04e4df8a2627c02&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      loading: false
    })

  }
  render() {
    return (
      <>
        <h2 className='mt-2'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {/* {this.state.loading && <Gif/>} */}
        <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Gif/>}>
            <div className="container">
              <div className="row mt-5">
                  {this.state.articles.map((element) => {
                    return <div className="col md-4" key={element.url}>
                      <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                  })}


              </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News