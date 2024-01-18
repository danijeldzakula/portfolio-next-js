import React, { useEffect, useRef } from 'react';

const Gallery = () => {
	const sectionGrab = useRef(null);

	useEffect(
		() => {
			//console.log(sectionGrab.current);

			//* Options docs: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
			const options = {
				root: null, // use the document's viewport as the container
				rootMargin: '0px', // % or px - offsets added to each side of the intersection
				threshold: 0.5 // percentage of the target element which is visible
			};

			//* Callback docs: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Targeting_an_element_to_be_observed
			let callback = (entries) => {
				entries.forEach((entry) => {
					// If entry (box) is visible - according with the params set in `options`
					// then adds `isVisible` class to box
					// otherwise removes `isVisible` class
					if (entry.isIntersecting) {
						entry.target.classList.add('isVisible');
					} else {
						entry.target.classList.remove('isVisible');
					}
				});
			};

			//* Create the intersection observer instance by calling its constructor and passing it a
			//* callback function to be run whenever a threshold is crossed in one direction or the other:
			let observer = new IntersectionObserver(callback, options);

			//* Get all the `.box` from DOM and attach the observer to these
			let scrollObserverTarget = sectionGrab.current.children;
			for (let target of scrollObserverTarget) observer.observe(target);
		},
		[ sectionGrab ]
	);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--gallery" ref={sectionGrab}>
				<div className="items">
1
				</div>
				<div className="items">					
				2
				</div>
				<div className="items">
					3
				</div>
				<div className="items">
					4					
				</div>
			</section>
		</React.Fragment>
	);
};

export default Gallery;
