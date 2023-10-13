import authenticatedAxios from "@/app/lib/axios";
import { API_ROUTES } from "./routes";

const register = async (data) => {
  const res = await authenticatedAxios.post(API_ROUTES.POST.REGISTER, data);
  return res.data;
};

const login = async (data) => {
  const res = await authenticatedAxios.post(API_ROUTES.POST.LOGIN, data);
  return res.data;
};

const userApi = {
  login,
  register,
};

export default userApi;
