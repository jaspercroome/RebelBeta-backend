import supabase from "../config/supabase";

export const authenticateUser = async (userJwt: string) => {
  const response = await supabase.auth.getUser(userJwt);
  return response;
};
