import config from '~/config';
import Admin from '~/pages/Admin';
import Email from '~/pages/Email';
import Home from '~/pages/Home';
import User from '~/pages/User';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.user, component: User, layout: null },
    { path: config.routes.admin, component: Admin, layout: null },
    { path: config.routes.email, component: Email, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
