import React from 'react';
import { Link } from 'react-router-dom';
//* Initial styles
import './header.scss';
const Header = (props) => {
	return (
		<React.Fragment>
			<header className={`gl__header ${!props.active ? 'isClose' : 'isOpen'}`}>
				<h1 className={`logo__brand ${!props.active ? 'isClose' : 'isOpen'}`}>
					<Link
						to="/"
						className="home__anchor cursor__focus"
						onClick={props.handleClose}
						onMouseEnter={() => props.handleHover(true)}
						onMouseLeave={() => props.handleHover(false)}
					>
						<svg width="100%" height="100%" viewBox="0 -1 50 42">
							<path d="M10 0 H10 V0 L31 20 L10 40" />
							<path d="M12.5 30 H12.5 V20 10 L12.5 10" />
							<path d="M40 40 H40 V40 L19 20 L40 0 V0" />
						</svg>
					</Link>
				</h1>
				<button
					className={`btn btn__reset nav__toggle cursor__focus ${!props.active ? 'isClose' : 'isOpen'}`}
					onClick={props.handleToggle}
				>
					<span className="icon icon--close">
						<svg width="24px" height="24px" viewBox="0 0 24 24">
							<line y2="24" y1="0" x2="24" x1="0" shapeRendering="crispEdges" />
							<line y2="0" y1="24" x2="24" x1="0" shapeRendering="crispEdges" />
						</svg>
					</span>
					<span className="icon icon--open">
						<svg width="30px" height="30px" viewBox="0 0 30 30">
							<g strokeWidth="1" fillRule="evenodd">
								<polygon points="0 9 30 9 30 8 0 8" />
								<polygon points="0 23 30 23 30 22 0 22" />
							</g>
						</svg>
					</span>
				</button>
			</header>
		</React.Fragment>
	);
};

export default Header;