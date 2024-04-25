import config from '~/config';

import Home from '~/pages/Home';
import User from '~/pages/User';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.user, component: User, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
