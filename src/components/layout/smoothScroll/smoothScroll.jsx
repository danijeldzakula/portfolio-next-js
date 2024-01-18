import React from 'react';
import { TweenLite, Power4 } from 'gsap';
//* Initial styles
import './smoothScroll.scss';

class SmoothScroll extends React.Component {
	state = {
		height: window.innerHeight
	};

	resizeObserver = new ResizeObserver((elements) => {
		for (let elem of elements) {
			const crx = elem.contentRect;
			this.setState({
				height: crx.height
			});
		}
	});

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
		this.resizeObserver.observe(this.viewport);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll);
		this.resizeObserver.unobserve(this.viewport);
	}

	onScroll = () => {
		TweenLite.to(this.viewport, 1, {
			y: -window.pageYOffset,
			ease: Power4.easeOut
		});
	};

	render() {
		return (
			<React.Fragment>
				<main className="gl__main" id="__main" ref={(ref) => (this.viewport = ref)}>
					{this.props.children}
				</main>
				<div style={{ height: this.state.height }} />
			</React.Fragment>
		);
	}
}

export default SmoothScroll;
