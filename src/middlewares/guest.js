export default function({ redirect, next }) {
  const token = localStorage.token ? localStorage.token : null;

  if (token) {
    redirect("/");
  }

  next();
}
