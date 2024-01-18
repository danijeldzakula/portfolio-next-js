import React, { useState, useEffect, useRef } from 'react';
import { TweenLite, Power4 } from 'gsap';
//* Initial styles
import './smoothScroll.scss';

const SmoothScroll = ({ children }) => {
	const [ scrollHeight, setScrollHeight ] = useState(0);
	const layoutContent = useRef(false);




	const resizeObserver = new ResizeObserver((elements) => {
		for (let elem of elements) {
			const crx = elem.contentRect;
			setScrollHeight(crx.height);
		}
	});

	//* did mount
	useEffect(() => {
		let layout = layoutContent.current;

		const onScroll = () => {
			TweenLite.to(layoutContent, 1, {
				y: -window.pageYOffset,
				ease: Power4.easeOut
			});
		};

		window.addEventListener('scroll', onScroll);
		resizeObserver.observe(layout);

		return () => {
			window.removeEventListener('scroll', onScroll);
			resizeObserver.unobserve(layout);
		};
	}, [ resizeObserver ]);

	return (
		<React.Fragment>
			<main className="gl__main" id="__main" ref={layoutContent}>
				{children}
			</main>
			<div style={{ height: scrollHeight }} />
		</React.Fragment>
	);
};

export default SmoothScroll;
