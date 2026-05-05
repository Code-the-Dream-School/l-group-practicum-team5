import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h1>Page not found!</h1>
      <Link to={"/"}>
        <button>Go back home</button>
      </Link>
    </>
  );
}

export default NotFoundPage;
