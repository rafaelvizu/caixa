import { FaGrinAlt } from "react-icons/fa";

function Navbar()
{
     return (
     <nav className="navbar navbar-expand bg-white shadow mb-4 topbar static-top navbar-light">
     <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars" /></button>
    <ul className="navbar-nav flex-nowrap ms-auto">
      <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><i className="fas fa-search" /></a>
        <div className="dropdown-menu dropdown-menu-end p-3 animated--grow-in" aria-labelledby="searchDropdown">
          <form className="me-auto navbar-search w-100">
            <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
              <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
            </div>
          </form>
        </div>
      </li>
  
      <div className="d-none d-sm-block topbar-divider" />
      <li className="nav-item dropdown no-arrow">
        <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#"><span className="d-none d-lg-inline me-2 text-gray-600 small">Valerie Luna</span>
        
        <FaGrinAlt className="border rounded-circle img-profile" />
        </a>
          <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in"><a className="dropdown-item" href="#"><i className="fas fa-user fa-sm fa-fw me-2 text-gray-400" />&nbsp;Profile</a><a className="dropdown-item" href="#"><i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400" />&nbsp;Settings</a><a className="dropdown-item" href="#"><i className="fas fa-list fa-sm fa-fw me-2 text-gray-400" />&nbsp;Activity log</a>
            <div className="dropdown-divider" /><a className="dropdown-item" href="#"><i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />&nbsp;Logout</a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</nav>

     )
}


export default Navbar;