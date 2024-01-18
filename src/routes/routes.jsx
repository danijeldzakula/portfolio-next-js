import Home from '../pages/home/home';
import Gallery from '../pages/gallery/gallery';
import Work from '../pages/work/work';
import Exception from '../pages/exception/exception';

const routes = [
	{
		path: '/',
		exact: true,
		component: Home
	},
	{
		path: '/gallery',
		exact: false,
		component: Gallery
	},
	{
		path: '/work',
		exact: false,
		component: Work
	},
	{
		path: '*',
		exact: false,
		component: Exception
	}
];

export default routes;
