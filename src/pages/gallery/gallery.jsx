import React, { useEffect } from 'react';

const Gallery = () => {
	useEffect(() => {
		console.log('gallery')
	}, []);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--gallery">
				<h1>Ni</h1>
			</section>
		</React.Fragment>
	);
};

export default Gallery;
