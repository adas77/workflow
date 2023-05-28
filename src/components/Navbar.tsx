import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { trimString } from "~/utils/format";
import Avatar from "./Avatar";
import Button from "./Button";
import Input from "./Input";

type Nav = {
  label: string;
  href: string;
};

const Navbar = () => {
  const home: Nav = {
    label: "Workflow",
    href: "/",
  };
  const paths: Nav[] = [
    {
      label: "Tasks",
      href: "/tasks",
    },
    {
      label: "Users",
      href: "/users",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
  ];
  const { data: sessionData } = useSession();
  return (
    <div className="navbar rounded-xl bg-base-200">
      <div className="flex-1">
        <Link href={home.href}>
          <Button className="text-xl" normalCase variant="ghost">
            {home.label}
          </Button>
        </Link>
        {paths.map((path) => (
          <Link key={path.label} href={path.href}>
            <Button normalCase variant="ghost">
              {path.label}
            </Button>
          </Link>
        ))}
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Input placeholder="Search" />
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0}>
            <Avatar image={sessionData?.user.image} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>{trimString(sessionData?.user.email || "")}</a>
            </li>
            <li>
              <Link
                className="justify-between"
                href={`/users/${sessionData?.user.email || ""}`}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                className="justify-between"
                href={`/users/${sessionData?.user.email || ""}`}
              >
                Settings
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              {
                <a
                  onClick={() => {
                    sessionData ? void signOut() : void signIn();
                  }}
                >
                  {sessionData ? "Sign Out" : "Sign In"}
                </a>
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
