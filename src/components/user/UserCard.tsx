import { type User } from "@prisma/client";
import AvatarLink from "../AvatarLink";
import ClipboardInput from "../ClipboardInput";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const { email, image, name, role } = user;
  return (
    <div className="grid w-fit gap-2 p-3">
      <AvatarLink image={image} email={user.email} />
      <p>{name}</p>
      <p>{role}</p>
      <ClipboardInput label={email} />
    </div>
  );
};

export default UserCard;
