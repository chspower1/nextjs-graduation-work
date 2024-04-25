export const createAccountAction = (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("password-confirm");
  console.log("create account", prevState, email, password, passwordConfirm);
  return { email, password };
};
