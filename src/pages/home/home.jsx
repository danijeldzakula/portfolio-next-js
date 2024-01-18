import React, { useEffect, createRef } from 'react';
//* home
import SectionHome from './views/sectionHome/sectionHome';
//* about
import SectionAbout from './views/sectionAbout/sectionAbout';
//* skills
import SectionSkills from './views/sectionSkills/sectionSkills';
//* work
import SectionWork from './views/sectionWork/sectionWork';
//* Initial styles
import './home.scss';

const Home = ({ darkMode }) => {
	const ref = createRef();
	//const { mode, setMode } = useState();
	//console.log(isVisible);
	useEffect(() => {
		console.log(ref.current);
		//console.log(isVisible)		
		//console.log(sectionHomeRef.current);
		//console.log(sectionAboutRef.current);
	}, [ref]);

	return (
		<React.Fragment>
			<SectionHome darkMode={darkMode} />
			<SectionAbout ref={ref} />
			<SectionSkills />
			<SectionWork  />
		</React.Fragment>
	);
};

export default Home;
