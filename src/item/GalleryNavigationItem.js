import React, { Component } from 'react';

class GalleryNavigationItem extends Component {

	constructor(props) {
        super(props);
    }

    render(){
    	
    	return(
    		<li className={this.props.itemClassName}>
    			<img 
                    className="gallery-image-item__icon" 
                    src={this.props.url} 
                    value={this.props.index} 
                    onClick={this.props.onHover()} 
                    alt="">
                </img>
    		</li>
    	)
    }
}

export default GalleryNavigationItem;
