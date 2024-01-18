import { TimelineMax as Timeline, Power1 } from 'gsap';

const getHomeTimeline = (node, delay) => {
	const timeline = new Timeline({ paused: true });
	const homeIntro = node.querySelector('.gl__section--home');
	const homeCanvas = node.querySelector('.canvas__home');

	timeline
		.from(node, 0.3, { display: 'none', autoAlpha: 0, delay, ease: Power1.easeIn })
		.from(homeIntro, 0.15, { autoAlpha: 0, ease: Power1.easeInOut })
		.from(homeCanvas, 0.3, { autoAlpha: 0, y: -50, delay: 0.75, ease: Power1.easeIn });

	return timeline;
};

const getDefaultTimeline = (node, delay) => {
	const timeline = new Timeline({ paused: true });
	const heading = node.querySelector('h1');

	timeline
		.from(node, 0.3, { display: 'none', autoAlpha: 0, delay, ease: Power1.easeIn })
		.from(heading, 0.3, { autoAlpha: 0, y: -50, delay: 0.75, ease: Power1.easeIn });

	return timeline;
};

const play = (pathname, node, appears) => {
	const delay = appears ? 0 : 0.5;
	let timeline;

	if (pathname === '/') {
		timeline = getHomeTimeline(node, delay);
	} else {
		timeline = getDefaultTimeline(node, delay);
	}

	//timeline = getDefaultTimeline(node, delay);
	timeline.play();
};

const exit = (node) => {
	const timeline = new Timeline({ paused: true });

	timeline.to(node, 0, { autoAlpha: 0, delay: 0, ease: Power1.easeOut });

	timeline.play();
};

export { play, exit };
