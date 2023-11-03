import ROUTES from "../routes";

export const MOCK_FOR_AMOUNT_OF_LINKS_CHECKING = [
  {
    active: ROUTES.HOME,
    links: [
      {
        path: ROUTES.HOME,
        name: "home",
      },
    ],
  },
  {
    active: ROUTES.PROFILE,
    links: [
      {
        path: ROUTES.PROFILE,
        name: "profile",
      },
      {
        path: ROUTES.HOME,
        name: "home",
      },
      {
        path: ROUTES.FAQ,
        name: "faq",
      },
    ],
  },
  {
    active: ROUTES.FULLREGISTER,
    links: [
      {
        path: ROUTES.FULLLOGIN,
        name: "login",
      },
      {
        path: ROUTES.FULLREGISTER,
        name: "register",
      },
    ],
  },
  {
    active: ROUTES.FULLREGISTER,
    links: [
      {
        path: ROUTES.FULLLOGIN,
        name: "login",
      },
      {
        path: ROUTES.FULLREGISTER,
        name: "register",
      },
    ],
  },
  {
    active: ROUTES.HOME,
    links: [
      {
        path: ROUTES.FULLLOGIN,
        name: "login",
      },
      {
        path: ROUTES.FULLREGISTER,
        name: "register",
      },
      {
        path: ROUTES.FAQ,
        name: "faq",
      },
      {
        path: ROUTES.HOME,
        name: "home",
      },
      {
        path: ROUTES.PROFILE,
        name: "profile",
      },
    ],
  },
];
