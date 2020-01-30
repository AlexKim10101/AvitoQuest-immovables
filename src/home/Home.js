
import React, { Component } from 'react';
import Gallery from './Gallery';


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
                    <div className="footer__text">&copy; 2019-2020</div>
    			</footer>
			</div>
    	);
    	
	}
}

export default Home;
