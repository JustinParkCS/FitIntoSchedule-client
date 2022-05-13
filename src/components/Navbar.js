import React from "react";
import { Link } from "react-router-dom";

const pages = [
  {
    title: "Messages",
    directory: "/message",
  },
  {
    title: "All-Meetings",
    directory: "/all-meeting",
  },
  {
    title: "My-Meetings",
    directory: "/my-meeting",
  },
];
const settings = [
  {
    title: "Sign in",
    directory: "/sign-in",
  },
  {
    title: "Sign up",
    directory: "/sign-up",
  },
];

const Navbar = () => {
  const [user] = React.useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  // React.useEffect(() => {

  // }, [user]);

  const logoutHandler = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    //   outer box
    <div className="sticky top-0 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-between px-4">
      {/* Far left */}
      <div className="flex gap-x-4">
        <Link to="/" className="font-extrabold text-xl gap-x-4 flex flex-row">
          <div>
            <button type="button" className="">
              IMAGE
            </button>
          </div>
          <div>
            <button type="button" className="">
              Home
            </button>
          </div>
        </Link>
        {/* <Link to={page.directory} key={page.title}>
            <button type="button" className="text-lg">
              {page.title}
            </button>
          </Link> */}
        {user &&
          pages.map((page) => (
            <Link to={page.directory} key={page.title}>
              <button type="button" className="text-lg">
                {page.title}
              </button>
            </Link>
          ))}
      </div>
      {/* Far right */}
      <div className="flex gap-x-4">
        {/* Not signed in? show the signin/signup options */}
        {!window.localStorage.getItem("user") ? (
          settings.map((page) => (
            <Link to={page.directory} key={page.title}>
              <button type="button" className="text-lg">
                {page.title}
              </button>
            </Link>
          ))
        ) : (
          // Signed in? show the logout
          <div className="flex gap-x-6">
            <Link to="/">
              <button
                type="button"
                className="btn btn-light"
                onClick={logoutHandler}
              >
                Log Out
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
