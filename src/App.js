import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
//* Initial Styles
import './App.scss';
// page theme
import useDarkMode from './components/common/pageTheme/useDarkMode';
//* Navigation of Header
import Navigation from './components/common/navigation/navigation';
//* Layout Main
import Layout from './components/layout/layout';

const App = ({ location, history }) => {
	//const { history } = props;
	const [ darkMode, setDarkMode ] = useDarkMode();

	//* option 1
	if (history.action === 'POP') {
		window.addEventListener('unload', (e) => {
			return window.scrollTo(0, 0);
		});
	}

	//* option 2
	if (window.history.scrollRestoration) {
		if (window.history.scrollRestoration === 'auto') {
			history.scrollRestoration = 'manual';
		}
		window.addEventListener('unload', () => {
			return window.scrollTo(0, 0);
		});
	}

	
	const scrollBottom = (selector, active) => {
		// let elem = document.querySelector(selector);
		// let elemHeight = elem.scrollHeight;

		// let scrollPos = window.scrollY;
		// let winHeight = window.outerHeight;

		// console.log(scrollPos);

		/*
		if (scrollPos + winHeight > elemHeight) {
			document.body.classList.add('tight');
		} else {
			document.body.classList.remove('tight');
		}

		if (scrollPos < 50) {
			document.body.classList.remove('tight');
		} 
		*/

		// if (scrollPos < 50) {
		// 	document.body.classList.remove('tight');
		// } else if (scrollPos + winHeight > elemHeight) {
		// 	document.body.classList.add('tight');
		// } else {
		// 	document.body.classList.remove('tight');
		// }

	};

	// useEffect(() => {


	// 	window.addEventListener(
	// 		'scroll',
	// 		() => {
	// 			scrollBottom('.gl__article');
	// 		},
	// 		false
	// 	);

	// 	return () => {
	// 		window.removeEventListener(
	// 			'scroll',
	// 			() => {
	// 				scrollBottom('.gl__article');
	// 			},
	// 			false
	// 		);
	// 	};
	// }, []);


	//window.removeEventListener('scroll',() => {}, false);

	return (
		<React.Fragment>
			<div className="gl__app" id="__app">
				<Navigation location={location} darkMode={darkMode} setDarkMode={setDarkMode} />
				<Layout darkMode={darkMode} setDarkMode={setDarkMode} />
			</div>
		</React.Fragment>
	);
};

export default withRouter(App);
