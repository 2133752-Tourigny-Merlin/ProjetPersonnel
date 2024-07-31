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
    Add: '/', //good
    Update: '/', //good
    Delete: '/:id', //good
  },
  Image: {
    Base: '/image', //good
    GetAll: '/', //good
    GetOne: "/:id", //good
    Add: '/',
    Delete: '/:id',
  },
} as const;
