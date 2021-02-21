import { auth } from "@/store/auth";

export default async ({ redirect, next, from }) => {
  let user = null;
  let token = null;

  if (from?.name && auth?.state?.user) {
    user = auth?.state?.user || null;
    token = localStorage.token ? localStorage.token : null;
  } else {
    token = localStorage.token ? localStorage.token : null;
    await auth.getUser({ token }).then((result) => {
      user = result || null;
    });
  }

  if (!(user && token)) {
    redirect("/login");
  } else {
    next();
  }
};
