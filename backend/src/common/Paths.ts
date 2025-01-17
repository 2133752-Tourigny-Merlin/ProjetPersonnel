/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  Projet: {
    Base: '/projet', //good
    GetAll: '/', //good
    GetOne: "/:id", //good
    GetRecent: "/recent/:nb", //good
    GetType: "/type/:type", //good
    Add: '/', //good
    Update: '/', //good
    Delete: '/:id', //good
  },
  Image: {
    Base: '/image', //good
    GetAll: '/', //good
    GetOneId: '/id/:id',
    GetOne: "/:id", //good
    GetRecent: "/recent/last", //good
    Add: '/', //good
    Delete: '/:id', //good
  },
} as const;
