import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <h1>Page not found!</h1>
      <Link to={"/"}></Link>
    </>
  );
}

export default NotFoundPage;
