import React, { Component } from 'react';

import { REQUEST_URL } from "../GlobalVariables";
import GalleryItem from "./GalleryItem";

class Gallery extends Component{
	constructor(props) {
        super(props);
        this.state = {
            galleryItems: [],
            isLoading: false,
        }
    }

	componentDidMount = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', REQUEST_URL+'items/', true); 
        xhr.send();
        this.setState({ isLoading: true })
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false;
            }
            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                this.setState({
                    galleryItems: JSON.parse(xhr.responseText),
                    isLoading: false, 
                })
            }
        }
    }

    renderGalleryItems = () =>{
        let list = null;
        list = this.state.galleryItems.map(function(item){
            return (
            	<GalleryItem 
            		key={item.id}
            		id={item.id}
            		address={item.address}
            		title={item.title}
            		previewImage={item.previewImage}
            		price={item.price}
            	/>
            )
        })
        
        return list;
    }

    render() {
    	return(
    		<div className="gallery__wrapper">
    			<ul className="gallery">
    				{this.renderGalleryItems()}
    			</ul>
			</div>
    	)
    	
	}
}

export default Gallery;
