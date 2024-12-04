import { NavLink } from 'react-router-dom';
const AdminMenu = () => {
  return (
    <div>
      <ul className="list-none mt-2">
        <li>
          <NavLink
            className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
            to="/admin/dashboard"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            Admin Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
            to="/admin/categorylist"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
            to="/admin/createproduct"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
            to="/admin/allproductslist"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            All Products
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
            to="/admin/userlist"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
            to="/admin/orderlist"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            Manage Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
            to="/admin/allcomments"
            style={({ isActive }) => ({
              color: isActive ? 'greenyellow' : 'white',
            })}
          >
            All Comments
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default AdminMenu;
