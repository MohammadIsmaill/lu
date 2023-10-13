import authenticatedAxios from "@/app/lib/axios";
import { API_ROUTES } from "./routes";

const getCourses = async (data = {}) => {
  const res = await authenticatedAxios.get(API_ROUTES.GET.GET_COURSES);
  return res.data;
};

const getCourse = async (data = {}) => {
  const { courseId } = data;
  const res = await authenticatedAxios.get(API_ROUTES.GET.GET_COURSE(courseId));
  return res.data;
};

const createComment = async (data = {}) => {
  const { courseId } = data;
  const res = await authenticatedAxios.post(
    API_ROUTES.POST.CREATE_COMMENT(courseId),
    data
  );
  return res.data;
};

const getComments = async (data = {}) => {
  const { courseId } = data;
  const res = await authenticatedAxios.get(
    API_ROUTES.GET.GET_COMMENTS(courseId)
  );
  return res.data;
};

const searchCourses = async (data = {}) => {
  const res = await authenticatedAxios.post(
    API_ROUTES.POST.SEARCH_COURSES,
    data
  );
  return res.data;
};
const courseApi = {
  getCourses,
  getCourse,
  createComment,
  getComments,
  searchCourses,
};

export default courseApi;
