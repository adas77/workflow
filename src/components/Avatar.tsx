import clsx from "clsx";
import Image from "next/image";

type Props = {
  image: string | null | undefined;
};

const Avatar = ({ image }: Props) => {
  image ||= "/img/unknown.jpg";
  return (
    <div className="avatar-group -space-x-6">
      <div className="avatar cursor-pointer">
        <div className={clsx("w-12")}>
          <Image
            height={48}
            width={48}
            src={image}
            alt={`${image}'s avatar image`}
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
