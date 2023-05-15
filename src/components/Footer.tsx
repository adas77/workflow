import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
const Footer = () => {
  const ICON_SIZE = 25;
  return (
    <footer className="footer mt-4 items-center bg-neutral p-4 text-neutral-content">
      <div className="grid-flow-col items-center">
        <p>
          Copyright © 2023 - All right <b>not</b> reserved
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://github.com/adas77/workflow">
          <FaGithub size={ICON_SIZE} />
        </Link>
        <Link href="mailto:adam.pilewski.workflow@gmail.com">
          <FaGoogle size={ICON_SIZE} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
