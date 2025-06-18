import { Link } from "react-router-dom";
import { paths } from "../../routes/Paths";

const NotFoundPage = () => (
  <div style={{ textAlign: "center", padding: "4rem" }}>
    <h1>404</h1>
    <p>Page not found</p>
    <Link to={paths.landing}>Back to landing</Link>
  </div>
);

export default NotFoundPage;