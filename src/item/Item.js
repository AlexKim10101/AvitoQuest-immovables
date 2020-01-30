
import React, { Component } from 'react';

import { REQUEST_URL } from "../GlobalVariables";
import { Link } from "react-router-dom";

import ItemContent from "./ItemContent";

class Item extends Component {
	constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: true,
        }
    }

	componentDidMount = () => {
		let arr = window.location.href.split('/');
		let id = arr[arr.length-1];

		const xhr = new XMLHttpRequest();
        xhr.open('GET', REQUEST_URL+'item/'+id, true); 
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
                    data: JSON.parse(xhr.responseText),
                    isLoading: false, 
                })
            }
        }
	}

    render() {

    	if(this.state.isLoading){
    		console.log('isLoading');
    		return(null)
    	} 
    	console.log(Object.keys(this.state.data[0]));
    	return(
    		<div className="wrapper">
    			<header className="header">
    				<h1>Недвижимость Москвы</h1>
    			</header>
    			<Link to="/" className="link-to-back">Назад</Link>
    			<main className="main main--item">
    				<ItemContent 
		    			address={this.state.data[0].address} 
			    		title={this.state.data[0].title} 
			    		price={this.state.data[0].price} 
			    		description={this.state.data[0].description} 
			    		sellerName={this.state.data[0].sellerName} 
			    		images={this.state.data[0].images} 
			    		key={this.state.data[0].id} 
			    	/>
    			</main>
    			<footer className="footer">
    			</footer>
			</div>

    	)

	}
}

export default Item;
