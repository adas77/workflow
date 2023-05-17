import React from "react";
import Avatar from "./Avatar";
import Link from "next/link";

type Props = {
  image: string | null | undefined;
  email: string;
};

const AvatarLink = ({ image, email }: Props) => {
  return (
    <Link href={`/users/${email}`}>
      <Avatar image={image} />
    </Link>
  );
};

export default AvatarLink;
