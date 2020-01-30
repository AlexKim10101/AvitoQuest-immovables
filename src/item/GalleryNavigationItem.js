import React, { Component } from 'react';


class GalleryNavigationItem extends Component {

	constructor(props) {
        super(props);
    }

    render(){
    	
    	return(
    		<li className={this.props.itemClassName}>
    			<img className="galleryImageItem__icon" src={this.props.url} value={this.props.index} onClick={this.props.onHover()} alt=""></img>
    		</li>
    	)
    }
}

export default GalleryNavigationItem;
