//import React, { useEffect, useLayoutEffect, useRef } from 'react';


/*
const SectionAbout = (props) => {
	const ref = useRef();

	useEffect(() => {}, []);

	useLayoutEffect(() => {
		console.log(ref)
	}, [ref]);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--about" ref={ref}>
				<h1>About Me</h1>
			</section>
		</React.Fragment>
	);
};

export default SectionAbout;
*/

import React, { useEffect } from 'react';
import './sectionAbout.scss'

const SectionAbout = React.forwardRef((props, ref) => {

	const click = () => {
		console.log('click')
	}

	useEffect(() => {
		click();
	}, [ ]);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--about" ref={ref}>
				<div className="container">
					<h3>
						<span className="triangle">
							<svg className="icon" version="1.1" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
								<polygon  fill="none" strokeWidth="5" strokeMiterlimit="10" points="93.8,3 49.5,72.4 5.2,3 " />    
							</svg> 
							<svg className="icon" version="1.1" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
								<polygon  fill="none" strokeWidth="5" strokeMiterlimit="10" points="93.8,3 49.5,72.4 5.2,3 " />    
							</svg> 
							<svg className="icon" version="1.1" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
								<polygon  fill="none" strokeWidth="5" strokeMiterlimit="10" points="93.8,3 49.5,72.4 5.2,3 " />    
							</svg> 												 
						</span>
						<span className="text">ABOUT ME</span>
					</h3>	


					<hr className="hr-1" />
				</div>


				<div className="container">
					<div className="grid">
						<figure className="gl__figure"></figure>

						<article className="gl__article">
							<h3>I like JavaScript and everything web.</h3>
							<h3>When my dev senses kick-in I build presumably awesome stuff. I stay close to the community and try to keep tabs with the pace at which the web is evolving. I also like to blog what I learn.</h3>
							<h3>I built this site from scratch. By scratch, I mean absolutely from scratch without any UI library/framework (except React though) and had so much fun along the way.</h3>
							<h3>React-Redux, Node.js, Ruby on Rails, Java, Spring Boot, Docker and AWS are the main tricks up my sleeve. I am also obsessed with making the web look pretty with SASS/CSS.</h3>
						</article>
					</div>
				</div>
			</section>
		</React.Fragment>
	)
});

export default SectionAbout;