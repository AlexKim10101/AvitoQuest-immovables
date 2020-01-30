import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Router } from "react-router-dom";
import {createBrowserHistory} from 'history';
import './style.css';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom";
import { Link } from "react-router-dom";

import { REQUEST_URL } from "./GlobalVariables";

const history = createBrowserHistory();

class App extends Component {
    render() {
      const { history } = this.props
      return (
        <div className="App">
          <Switch>
            <Route history={history} path='/home' component={Home} />
            <Route history={history} path='/item' component={Item} />
            <Redirect from='/' to='/home'/>
          </Switch>
        </div>
      );
    }
  }

class Home extends Component {

    render() {
    	return(
    		<div className="wrapper">
    			<header className="header">
    				<h1 className="header__title">Недвижимость Москвы</h1>
    			</header>
    			<main className="main">
    				<Gallery />
    			</main>
    			<footer className="footer">
    			</footer>
			</div>
    	);
    	
	}
}


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
    	console.log(this.state.galleryItems);
    	return(
    		<div className="gallery__wrapper">
    			<ul className="gallery">
    				{this.renderGalleryItems()}
    			</ul>
			</div>
    	)
    	
	}
}

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
						<img className="image" src={this.props.previewImage}></img>
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

class ItemContent extends Component {

	constructor(props) {
        super(props);
        this.state = {
        	bigPhotoIndex: 0,
        	visiblePhotoIndex: 0,
        }
        this.handleHover = this.handleHover.bind(this);
    }


    handleHover(id){
    	console.log(id.target);
    	this.setState({
    		bigPhotoIndex: id.target.getAttribute('value'),
    	})
    }


    renderGalleryImages(){
    	let list = null;
    	let func = () => this.handleHover;
    	let visiblePhotoIndex = this.state.bigPhotoIndex;
    	let GalleryImageItemClassName;
    	list = this.props.images.map(function(image, index){
    		if(index == visiblePhotoIndex){
    			GalleryImageItemClassName='galleryImageItem galleryImageItem--selected';
    		}else{
    			GalleryImageItemClassName='galleryImageItem';
    		}
    		return <GalleryImageItem 
	    		url={image} 
	    		onHover={func} 
	    		index={index}
	    		itemClassName={GalleryImageItemClassName}
    		/>
    	})
    	return list;
    }

    render(){
    	let valueToLeft = (this.state.bigPhotoIndex == 0)? this.props.images.length-1 : +this.state.bigPhotoIndex - 1;
    	let valueToRight = (this.state.bigPhotoIndex == this.props.images.length-1)? 0 : +this.state.bigPhotoIndex + 1;
    	console.log(valueToRight);

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
	    					{this.renderGalleryImages()}
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




class GalleryImageItem extends Component {

	constructor(props) {
        super(props);
    }

    render(){
    	
    	return(
    		<li className={this.props.itemClassName}>
    			<img className="galleryImageItem__icon" src={this.props.url} value={this.props.index} onClick={this.props.onHover()}></img>
    		</li>
    	)
    }




}
ReactDOM.render((
    <Router history={history}>
       <App/>
    </Router>
   ), document.getElementById('root')
  );