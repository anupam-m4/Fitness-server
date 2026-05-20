'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/users/me',
      handler: 'user.findMe',
      config: {
        auth: true,
      },
    },
    {
      method: 'PUT',
      path: '/users/me',
      handler: 'user.updateMe',
      config: {
        auth: true,
      },
    },
  ],
};