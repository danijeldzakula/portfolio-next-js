import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import { play, exit } from './timelinesAnima/timelinesAnima';
//* routes
//import routes from '../../routes/routes';
//* Preloader on router
import Preloader from './preloader/preloader';
//* Footer
import Footer from '../common/footer/footer';
// home
import Home from '../../pages/home/home';
import Gallery from '../../pages/gallery/gallery';




//* Initial styles
import './layout.scss';

const Layout = ({darkMode}) => {

	useEffect(() => {
	}, []);

	return (
		<Route
			render={({ location }) => {
				
				const { pathname, key } = location;

				return (
					<React.Fragment>
						<TransitionGroup component={null}>
							<Transition
								key={key}
								appear={true}
								onEnter={(node, appears) => play(pathname, node, appears)}
								onExit={(node, appears) => exit(node, appears)}
								timeout={{ enter: 750, exit: 0 }}
							>
								<main className="gl__main">
									<article className="gl__article">
										<Switch location={location} key={key}>
											<Preloader>
												<Route exact path="/">
													<Home darkMode={darkMode} />
												</Route>

												<Route path="/gallery">
													<Gallery />
												</Route>
											</Preloader>
										</Switch>
									</article>
									<Footer />	
								</main>
							</Transition>
						</TransitionGroup>
					</React.Fragment>
				);
			}}
		/>
	);
};

export default Layout;

