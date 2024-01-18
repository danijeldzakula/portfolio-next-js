import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
//* Freeze/Unfreeze
import { freeze, unfreeze } from '../scrollFreeze/scrollFreeze';
//* Add custom components
import Header from '../header/header';
//* Toggle theme
import ToggleTheme from '../pageTheme/ToggleTheme';
//* Initial styles
import './navigation.scss';

const NavBar = (props) => {
	const [ active, setActive ] = useState(false);
	const [ hover, setHover ] = useState(false);
	const location = props.location;
	//* hover on this nav links
	const handleHover = (bool) => {
		setHover(bool);
	};
	//* toogle on menu button in header
	const handleToggle = () => {
		active ? freeze() : unfreeze();
		setActive(!active);
	};
	//* close on nav items and header logo
	const handleClose = () => {
		setActive(false);
		unfreeze();
	};
	//* close on keypress (esc, arrow (top, right, bottom, left))
	const handleCloseKey = (e) => {
		let eKey = e.keyCode || window.e || e.which;
		if ((eKey >= 37 && eKey <= 40) || eKey === 27) return [ setActive(false), unfreeze() ];
	};

	useEffect(
		() => {
			active ? freeze() : unfreeze();
			document.addEventListener('keydown', handleCloseKey, false);
			return () => {
				document.removeEventListener('keydown', handleCloseKey, false);
			};
		},
		[ active ]
	);

	return (
		<React.Fragment>
			<Header
				handleToggle={handleToggle}
				handleClose={handleClose}
				active={active}
				location={location}
				handleHover={handleHover}
			/>
			<nav className={`gl__nav ${!active ? '' : 'isOpen'}`}>
				<div className={`nav__overlay ${!hover ? '' : 'isOpacity'}`} />
				<ul className="menu">
					<NavLink
						to="/"
						className="menu__item menu__item--home cursor__focus"
						onClick={handleClose}
						onMouseEnter={() => handleHover(true)}
						onMouseLeave={() => handleHover(false)}
						exact
						strict
					>
						Home
					</NavLink>
					<NavLink
						to="/gallery"
						className="menu__item menu__item--gallery cursor__focus"
						onClick={handleClose}
						onMouseEnter={() => handleHover(true)}
						onMouseLeave={() => handleHover(false)}
						strict
					>
						Gallery
					</NavLink>
					<NavLink
						to="/work"
						className="menu__item menu__item--work cursor__focus"
						onClick={handleClose}
						onMouseEnter={() => handleHover(true)}
						onMouseLeave={() => handleHover(false)}
						strict
					>
						Work
					</NavLink>
					<div className="menu__active-follow">
						<span className="menu__dot" />
					</div>
				</ul>

				<ToggleTheme darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
			</nav>
		</React.Fragment>
	);
};

export default NavBar;
