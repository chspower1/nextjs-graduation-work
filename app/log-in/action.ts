"use server";
export const loginAction = (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(prevState, email, password);
  return { email, password };
};
