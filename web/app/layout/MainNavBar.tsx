import { useState, useEffect } from "react";
import { Link, Form, useFetcher } from "@remix-run/react";

interface MainNavBarProps {
  isAuthenticated: boolean;
}

export function MainNavBar({ isAuthenticated }: MainNavBarProps) {
  const [isAuthenticatedState, setIsAuthenticated] = useState(isAuthenticated);

  const logoutFetcher = useFetcher<{ success: boolean }>();

  const onClickLogout = async () => {
    await logoutFetcher.submit(null, { method: "POST", action: "/logout" });
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-orange-800 p-2 md:hidden">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Complit
        </Link>
        <button
          className="text-white focus:outline-none"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            if (menu) {
              menu.classList.toggle("hidden");
            }
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <div id="mobile-menu" className="hidden mt-2">
        <Link to="/" className="block text-white py-2">
          Home
        </Link>
        {isAuthenticatedState ? (
          <>
            <Link to={"/me"} className="block text-white py-2 text-left w-full">
              My Profile
            </Link>
            <button
              onClick={onClickLogout}
              className="block text-white py-2 text-left w-full"
            >
              Logout
            </button>
          </>
        ) : (
          <Form method="get" action="/login">
            <button
              type="submit"
              className="block text-white py-2 text-left w-full"
            >
              Login
            </button>
          </Form>
        )}
      </div>
    </nav>
  );
}

export function CollapsibleSideNavBar({ isAuthenticated }: MainNavBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isAuthenticatedState, setIsAuthenticated] = useState(isAuthenticated);

  const logoutFetcher = useFetcher<{ success: boolean }>();

  const onClickLogout = async () => {
    await logoutFetcher.submit(null, { method: "POST", action: "/logout" });
    setIsAuthenticated(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      const sideNav = document.getElementById("side-nav");
      if (window.innerWidth >= 768) {
        sideNav?.classList.remove("hidden");
      } else {
        sideNav?.classList.add("hidden");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      id="side-nav"
      className={`bg-orange-800 p-4 fixed h-full transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <button
        className="text-white focus:outline-none mb-4"
        onClick={toggleCollapse}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div
        className={`flex flex-col items-start ${isCollapsed ? "hidden" : ""}`}
      >
        <Link to="/" className="text-white text-2xl font-semibold mb-4">
          Complit
        </Link>
        <Link to="/" className="block text-white py-2">
          Home
        </Link>
        {isAuthenticatedState ? (
          <>
            <Link to={"/me"} className="block text-white py-2 text-left w-full">
              My Profile
            </Link>
            <button
              onClick={onClickLogout}
              className="block text-white py-2 text-left w-full"
            >
              Logout
            </button>
          </>
        ) : (
          <Form method="get" action="/login">
            <button
              type="submit"
              className="block text-white py-2 text-left w-full"
            >
              Login
            </button>
          </Form>
        )}
      </div>
    </nav>
  );
}

export default function NavBar({ isAuthenticated }: MainNavBarProps) {
  return (
    <>
      <MainNavBar isAuthenticated={isAuthenticated} />
      <CollapsibleSideNavBar isAuthenticated={isAuthenticated} />
    </>
  );
}
