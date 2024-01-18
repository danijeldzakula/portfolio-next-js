import React, { useEffect } from 'react';

const Exception = (props) => {
	console.log(props);

	useEffect(() => {}, []);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--exception">
				<h1>Exception</h1>
			</section>
		</React.Fragment>
	);
};

export default Exception;
