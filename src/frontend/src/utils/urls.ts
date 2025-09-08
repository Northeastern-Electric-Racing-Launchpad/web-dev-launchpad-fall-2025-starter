// Urls for the backend
const BASE_URL = "http://localhost:4007";

/* PROJECTS */
const PROJECTS = BASE_URL + "/projects/";
const PROJECTS_NEW = PROJECTS + "new";
const PROJECT_BY_ID = (id: string) => PROJECTS + id;

/* EXPERIENCES */
const EXPERIENCES = BASE_URL + "/experiences/";
const EXPERIENCES_NEW = EXPERIENCES + "new";
const EXPERIENCE_BY_ID = (id: string) => EXPERIENCES + id;

/* USERS */
const USERS = BASE_URL + "/users/";
const LOGIN = USERS + "auth/login";

/* Images */
const IMAGES = (imagePath: string) => BASE_URL + "/" + imagePath;

export const urls = {
  PROJECTS,
  PROJECTS_NEW,
  PROJECT_BY_ID,

  EXPERIENCES,
  EXPERIENCES_NEW,
  EXPERIENCE_BY_ID,

  USERS,
  LOGIN,

  IMAGES,
};
