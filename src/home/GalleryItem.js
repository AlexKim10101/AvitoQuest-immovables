import React, { Component } from 'react';
import { Link } from "react-router-dom";

class GalleryItem extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let href = '/item/' + this.props.id;
		return(
			<li className="item">
				<Link to={href} className="item__link">
					<div className="image-wrapper">
						<img className="image" src={this.props.previewImage} alt=""></img>
					</div>
					<div className="item-title">
						{this.props.title}
					</div>
					<div className="item-address">{this.props.address}</div>
					<div className="item-price">{this.props.price}</div>
				</Link>
			</li>
		)
	}
}

export default GalleryItem;
