import React, { Component } from 'react'

export class NewsItems extends Component {
    
  render() {
    let {title, description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
        <>
        <div className="card" >
        <div>
          <span className="badge rounded-pill bg-danger" style={{display: 'flex',justifyContent: 'flex-end',position:'absolute', right:'0'}}>{source}</span>
          </div>  
        <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2023/02/SagarLele-770x433.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author?"Unknow":author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </>
    )
  }
}

export default NewsItems