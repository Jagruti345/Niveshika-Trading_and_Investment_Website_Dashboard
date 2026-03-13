import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // 🔹 check login status
  useEffect(() => {
    axios
      .post("http://localhost:3002/verify", {}, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  // 🔹 logout function
  const handleLogout = () => {
    document.cookie = "token=";
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />

      <div className="menus">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link to="/apps" onClick={() => handleMenuClick(5)}>
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* 🔹 LOGIN BUTTON */}
        {!isLoggedIn ? (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        ) : (
          <div className="profile" onClick={handleProfileClick}>
            <div className="avatar">U</div>
            <p className="username">User</p>

            {isProfileDropdownOpen && (
              <div className="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;