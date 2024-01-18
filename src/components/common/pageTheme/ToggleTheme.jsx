import React from 'react';
import './toggleTheme.scss';
const ToggleTheme = ({ darkMode, setDarkMode, handleHover }) => (
	<button
		className="btn btn__reset toggle__theme cursor__focus"
		//onMouseEnter={() => handleHover(true)}
		//onMouseLeave={() => handleHover(false)}
	>
		<span className="switch__theme">
			<input
				className="theme__input"
				id="switchCheck"
				type="checkbox"
				checked={darkMode}
				onChange={() => setDarkMode(!darkMode)}
			/>
			<label htmlFor="switchCheck" />
		</span>
	</button>
);
export default ToggleTheme;
