export const API_ROUTES = {
  GET: {
    GET_COURSES: "/course",
    GET_COURSE: (id) => `/course/${id}`,
    GET_COMMENTS: (id) => `/course/${id}/comment`,
  },
  POST: {
    SEARCH_COURSES: `/course/search`,
    CREATE_COMMENT: (id) => `/course/${id}/comment`,
  },
  PUT: {
    EDIT_COMMENT: (id, commentId) => `/course/${id}/comment/${commentId}`,
  },
  DELETE: {
    DELETE_COMMENT: (id, commentId) => `/course/${id}/comment/${commentId}`,
  },
};
