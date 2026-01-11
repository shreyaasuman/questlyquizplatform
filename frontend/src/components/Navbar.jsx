import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-extrabold text-indigo-600"
      >
        Questly
      </Link>

      {/* ACTIONS */}
      <div className="flex items-center gap-6">
        {!token ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg
                         hover:bg-indigo-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg
                         hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;