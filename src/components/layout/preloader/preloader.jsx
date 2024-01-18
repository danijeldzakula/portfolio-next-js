import React, { useState, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
//* Initial Styles
import './preloader.scss';
const LoaderTransition = (props) => {
	const [ count, setCount ] = useState(0);
	const willMount = useRef(true);
	const loaderTransition = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

	if (willMount.current) {
		document.body.setAttribute('page-load', 'startAnimation');
		willMount.current = false;
		setCount(count);
	}
	useEffect(() => {
		(async () => {
			await loaderTransition(300);
			document.body.setAttribute('page-load', 'finishAnimation');
		})();
	}, []);

	return (
		<React.Fragment>
			<Route {...props} />
		</React.Fragment>
	);
};
export default LoaderTransition;
