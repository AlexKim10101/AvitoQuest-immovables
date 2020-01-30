import React, { Component } from 'react';
import GalleryNavigationItem from './GalleryNavigationItem';


class ItemContent extends Component {

	constructor(props) {
        super(props);
        this.state = {
        	bigPhotoIndex: 0,
        }
        this.handleHover = this.handleHover.bind(this);
    }

    handleHover(id){
    	this.setState({
    		bigPhotoIndex: id.target.getAttribute('value'),
    	})
    }

    renderGalleryNavigation(){
    	let list = null;
    	let func = () => this.handleHover;
    	let selectedPhotoIndex = this.state.bigPhotoIndex;
    	let itemClassName;
    	list = this.props.images.map(function(image, index){
    		if(index == selectedPhotoIndex){
    			itemClassName='gallery-image-item gallery-image-item--selected';
    		}else{
    			itemClassName='gallery-image-item';
    		}
    		return <GalleryNavigationItem 
                key={index}
	    		url={image} 
	    		onHover={func} 
	    		index={index}
	    		itemClassName={itemClassName}
    		/>
    	})
    	return list;
    }

    render(){
    	let valueToLeft = (this.state.bigPhotoIndex == 0)? this.props.images.length-1 : +this.state.bigPhotoIndex - 1;
    	let valueToRight = (this.state.bigPhotoIndex == this.props.images.length-1)? 0 : +this.state.bigPhotoIndex + 1;

    	return (
    		<div className="immovable">
	    		<div className="immovable__title">{this.props.title}</div>

    			<div className="left-col">
	    			<div className="immovable__images">
	    				<div className="big-photo__wrapper">
	    					<img className="big-photo" src={this.props.images[this.state.bigPhotoIndex]}></img>
	    					<div className="toLeft" value={valueToLeft} onClick={this.handleHover}>
	    						<div className="gallery-navigation-icon gallery-navigation-icon--left" value={valueToLeft}></div>
	    					</div>
	    					<div className="toRight" value={valueToRight} onClick={this.handleHover}>
	    						<div className="gallery-navigation-icon gallery-navigation-icon--right" value={valueToRight}></div>
	    					</div>
	    				</div>
	    				<div>Фото - {+this.state.bigPhotoIndex+1}/{this.props.images.length}</div>
	    				<ul className="gallery-navigation">
	    					{this.renderGalleryNavigation()}
	    				</ul>
	    			</div>
    			</div>

    			<div className="right-col">
	    			<div className="immovable__desrcription">
	    				<div className="immovable__price">{this.props.price}</div>
	    				<div className="immovable__seller">{this.props.sellerName}</div>
	    				<div className="immovable__info">{this.props.description}</div>
	    			</div>
	    		</div>
    		</div>
    	);
    }
}

export default ItemContent;
