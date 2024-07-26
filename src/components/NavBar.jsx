import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { CiFlag1 } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Reducer';

const menuItems = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
  { name: 'Newsletter', to: '/newsletter' },
  { name: 'Updates', to: '/updates' },
];

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const previewImage = useSelector((state) => state.auth.avatar);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await dispatch(logout());
    if (response?.payload?.statusCode === 200) {
      navigate('/');
    }
  };

  // Function to close the menu
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full bg-orange-500">
      <div className="mx-auto flex max-w-7xl gap-12 items-center justify-between px-4 py-2 sm:px-6 lg:px-4">
        {/* Logo and title section */}
        <Link to="/" className="inline-flex items-center space-x-2">
          <span className="text-white font-bold">
            <CiFlag1 />
          </span>
          <span className="font-bold text-white">Rashtriya Swayamsevak Sangh</span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="inline-flex items-center text-sm font-semibold text-white hover:text-gray-900"
            >
              {item.name}
            </Link>
          ))}

          {/* Conditional rendering of Admin Dashboard link */}
          {isLoggedIn && role === 'ADMIN' && (
            <Link to="/admin/dashboard" className="text-sm font-semibold text-white hover:text-gray-900">
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* Sign in, log in, and avatar section for desktop */}
        <div className="hidden lg:block space-x-2">
          {!isLoggedIn ? (
            <div className="mt-2 flex mb-1 justify-start items-start space-x-2">
              <Link to="/signup">
                <button
                  type="button"
                  className="w-full rounded-md border border-orange-700 bg-orange-500 px-6 py-1 text-sm font-semibold text-white hover:bg-white hover:text-orange-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Signup
                </button>
              </Link>
              <Link to="/Login">
                <button
                  type="button"
                  className="w-full rounded-md border border-orange-700 bg-white px-6 py-1 text-sm font-semibold text-orange-500 hover:bg-orange-500 hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Log In
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-md border border-orange-700 bg-white px-6 py-1 text-sm font-semibold text-orange-500 hover:bg-orange-500 hover:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Logout
              </button>
              <div className="avatar flex justify-start items-start">
                <div className="w-10 h-10 ml-6 mb-1 rounded-full overflow-hidden">
                  {previewImage ? (
                    <Link to='user/profile'>
                      <img src={previewImage} className="w-full h-full object-cover" alt="Avatar" />
                    </Link>
                  ) : (
                    <BsPersonCircle className="w-full h-full object-cover text-6xl" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Menu icon for mobile */}
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer text-white" />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-white ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center space-x-2">
                    <span className="text-orange-500 font-bold">
                      <CiFlag1 />
                    </span>
                    <span className="font-bold text-orange-500">Rashtriya Swayamsevak Sangh</span>
                  </Link>
                  <div className="w-10 h-10 ml-6 mb-1 rounded-full overflow-hidden">
                    {previewImage ? (
                      <Link to='user/profile'>
                        <img src={previewImage} className="w-full h-full object-cover" alt="Avatar" />
                      </Link>
                    ) : (
                      <BsPersonCircle className="w-full h-full object-cover text-6xl" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={handleMenuItemClick} // Close menu on link click
                        className="m-3 flex items-center rounded-md p-3 text-sm font-semibold text-orange-500 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                    {isLoggedIn && role === 'ADMIN' && (
                      <Link
                        to="/admin/dashboard"
                        onClick={handleMenuItemClick} // Close menu on link click
                        className="m-3 flex items-center rounded-md p-3 text-sm font-semibold text-orange-500 hover:bg-gray-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </nav>
                </div>

                {!isLoggedIn ? (
                  <div className="mt-6 space-y-2">
                    <Link to="/signup">
                      <button
                        type="button"
                        className="w-full rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Signup
                      </button>
                    </Link>
                    <Link to="/Login">
                      <button
                        type="button"
                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        Log In
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="w-full rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
