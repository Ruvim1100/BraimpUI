import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";

const NotFoundPage = () => (
  <div style={{ textAlign: "center", padding: "4rem" }}>
    <h1>404</h1>
    <p>Page not found</p>
    <Link to={paths.notFound}>Back to landing</Link>
  </div>
);

export default NotFoundPage;