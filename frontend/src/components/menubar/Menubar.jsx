import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./menubar.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Menubar = () => {
  const navigate = useNavigate();
  const currentPath = useLocation();
  const { setAuthData, auth } = useContext(AppContext);
  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuthData(null, null);
    navigate("/login");
  }

  const isActive = (path)=>{
    return path===currentPath.pathname;
  }

  const getMenuItem = (item, index)=>{
    if(auth.role!=="ROLE_ADMIN" && item.access==="admin") return;
    return (<li className="nav-item" key={index}>
              <Link className={`nav-link ${isActive(item.path)? "fw-bold text-warning":""}`} to={ item.path }>
                {item.title}
              </Link>
            </li>);
  }

  const isAdmin = auth.role==="ROLE_ADMIN";
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
      <a className="navbar-brand" href="#">
        <img
          src={assets.logo}
          alt="Logo"
          height="40"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
                [{title:"Dashboard",path:"/",access:"all"}, {title:"Explore",path:"/explore",access:"all"}, {title:"Manage Items",path:"/items",access:"admin"}, {title:"Manage Categories",path:"/categories",access:"admin"}, {title:"Manage Users",path:"/users",access:"admin"}, {title:"Order History",path:"/orders",access:"all"}].map((item, index) => (
                  getMenuItem(item, index)
                ))
            }
        </ul>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={assets.user} alt="" height={32} width={32} />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <a href="#" className="dropdown-item">Settings</a>
              </li>
              <li>
                <a href="#" className="dropdown-item">Activity Log</a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a href="" className="dropdown-item" onClick={logout}>Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menubar;
