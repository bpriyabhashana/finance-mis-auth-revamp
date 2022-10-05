// Change app name based on your demand
export const APP_NAME = "Auth Boilerplate";
export const APP_NAME_ROUTE = "/auth-boilerplate";

export const APP_CONTEXT = APP_NAME_ROUTE;

export const QUERY_PARAMS_REGEX = /^[a-z0-9]*$/i;

export const AUTH_CONFIG = {
  signInRedirectURL: `${process.env.REACT_APP_AUTH_SIGNIN_REDIRECT_URL}`,
  signOutRedirectURL: `${process.env.REACT_APP_AUTH_SIGNOUT_REDIRECT_URL}`,
  clientID: `${process.env.REACT_APP_ASGARDEO_CLIENT_ID}`,
  serverOrigin: `${process.env.REACT_APP_ASGARDEO_SERVER_ORIGIN}`,
  baseUrl: `${process.env.REACT_APP_ASGARDEO_SERVER_ORIGIN}`,
  scope: ["openid", "profile"],
};

// Credentials for choreo token exchange
export const CHOREO_AUTH_CONFIG = {
  TOKEN_APIS: {
    CHOREO_TOKEN_ENDPOINT: process.env.REACT_APP_CHOREO_TOKEN_ENDPOINT,
    CHOREO_REVOKE_ENDPOINT: process.env.REACT_APP_CHOREO_REVOKE_ENDPOINT,
    CHOREO_CLIENT_ID: process.env.REACT_APP_CHOREO_CLIENT_ID,
    CHOREO_CLIENT_SECRET: process.env.REACT_APP_CHOREO_CLIENT_SECRET,
  },
};

// User configs - Customize according to the choice of user
export const USER_CUSTOM_CONFIGS = {
  LAUNCHPAD: false,
};

// Sample previlages
export const PRIVILEGES = {
  HOME: 1,
  ADMIN_ACCESS: 2,
};

export const APP_CONFIG = {
  PAGES: {
    APP: APP_CONTEXT,
    HOME: APP_CONTEXT + "/home",
    MANAGE: APP_CONTEXT + "/manage",
    PROFILE: APP_CONTEXT + "/profile",
    PREFERENCES: APP_CONTEXT + "/preferences",
    NOT_FOUND: APP_CONTEXT + "/not-found",
  },
  EMAILS: {
    GET_HELP_EMAIL_TO: "internal-apps-group@wso2.com",
    GET_HELP_EMAIL_SUBJECT: `[HELP] ${APP_NAME}`,
  },
  QUERY_VALUES: {
    VIEW: "view",
    EDIT: "edit",
    ACCOUNT: "account",
    TAGS: "tags",
    ROLES: "roles",
  },
};

export const LAUNCHPAD_ITEMS = [
  {
    id: 1,
    title: "Photos",
    category: "Marketing",
    description: "Marketing application make your life easier",
    isStared: true,
    url: "https://apps.wso2.com/",
    icon: "https://purepng.com/public/uploads/large/purepng.com-photos-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596102asedt.png",
  },
  {
    id: 2,
    title: "Camera",
    category: "General",
    description: "General applications",
    isStared: true,
    url: "https://apps.wso2.com/",
    icon: "https://i.pinimg.com/originals/e2/bc/2b/e2bc2b005d593253f62a4727d3da5d4f.png",
  },
  {
    id: 3,
    title: "Calender",
    category: "HR",
    description: "Human Resource application",
    isStared: true,
    url: "https://apps.wso2.com/",
    icon: "https://i.pinimg.com/originals/1c/18/61/1c1861046d8f837de76fa78fcad98b7a.png",
  },
  {
    id: 4,
    title: "Stocks",
    category: "Sites",
    description: "All recordes sites are here",
    isStared: false,
    url: "https://apps.wso2.com/",
    icon: "https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Stock-512.png",
  },
  {
    id: 5,
    title: "Videos",
    category: "Marketing",
    description: "Marketing application make your life easier",
    isStared: true,
    url: "https://apps.wso2.com/",
    icon: "https://purepng.com/public/uploads/large/purepng.com-videos-icon-ios-7symbolsiconsapple-iosiosios-7-iconsios-7-721522596692wqfcj.png",
  },
  {
    id: 6,
    title: "Music",
    category: "HR",
    description: "HR perspectives",
    isStared: true,
    url: "https://apps.wso2.com/",
    icon: "https://i.pinimg.com/originals/ae/2e/56/ae2e5651b74a00d5d31b8c6453fa3ebb.png",
  },
  {
    id: 7,
    title: "Voice",
    category: "Sites",
    description: "Marketing application make your life easier",
    isStared: true,
    url: "https://apps.wso2.com/",
    icon: "https://i.pinimg.com/originals/13/6f/6b/136f6b5e8bc194b681b591dc61e16b36.png",
  },
];
