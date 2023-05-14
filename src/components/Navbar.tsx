import Avatar from "./Avatar";
import Input from "./Input";

type Props = {
  label: string;
};

const Navbar = ({ label }: Props) => {
  return (
    <div className="navbar rounded-xl bg-base-200">
      <div className="flex-1">
        <a className="btn-ghost btn text-xl normal-case">{label}</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Input placeholder="Search" />
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0}>
            <Avatar image={null} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
