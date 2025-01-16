import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-5 gap-3">
      <h1 className="text-5xl">Opp's!</h1>
      <h2>404 - Page Not Found</h2>
      <Link to="/">
        <button className="bg-primary p-2 rounded text-white">
          Go to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
