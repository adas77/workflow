import { type User } from "@prisma/client";
import AvatarLink from "./AvatarLink";

type AvatarsProps = {
  users: User[];
  usersToShow?: number;
};

const Avatars = ({ users, usersToShow }: AvatarsProps) => {
  usersToShow = usersToShow === undefined || usersToShow <= 0 ? 7 : usersToShow;
  const usersCount = users.length;
  const slicedUsers = users.slice(0, usersToShow);

  return (
    <div className="avatar-group -space-x-6">
      {slicedUsers.map((user) => (
        <AvatarLink key={user.id} image={user.image} email={user.email} />
      ))}
      {usersCount > usersToShow && (
        <PlaceHolder size={usersCount - usersToShow} />
      )}
    </div>
  );
};

type PlaceHolderProps = {
  size: number;
};
const PlaceHolder = ({ size }: PlaceHolderProps) => {
  return (
    <div className="placeholder avatar">
      <div className="w-12 bg-neutral-focus text-neutral-content">
        <span>+{size}</span>
      </div>
    </div>
  );
};

export default Avatars;
