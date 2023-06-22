import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <br></br>
      <p>Oops! The page is not found.</p>
      <br></br>
      <Link to="/">Back to Homepage</Link>
    </div>
  );
}
 
export default NotFound;