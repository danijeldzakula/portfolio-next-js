import React, { useEffect } from 'react';

const SectionSkills = () => {
	useEffect(() => {},[]);

	return (
		<React.Fragment>
			<section className="gl__section gl__section--skills">
				<div className="container">
					<h3>
						<span className="triangle">
							<svg className="icon" version="1.1" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
								<polygon  fill="none" stroke="#495057" strokeWidth="5" strokeMiterlimit="10" points="93.8,3 49.5,72.4 5.2,3 " />    
							</svg> 
							<svg className="icon" version="1.1" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
								<polygon  fill="none" stroke="#6C757D" strokeWidth="5" strokeMiterlimit="10" points="93.8,3 49.5,72.4 5.2,3 " />    
							</svg> 
							<svg className="icon" version="1.1" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin">
								<polygon  fill="none" stroke="#6C757D" strokeWidth="5" strokeMiterlimit="10" points="93.8,3 49.5,72.4 5.2,3 " />    
							</svg> 												 
						</span>
						<span className="text">SKILLS ME</span>
					</h3>	


					<hr className="hr-1" />	
				</div>
			</section>
		</React.Fragment>
	);
};

export default SectionSkills;
