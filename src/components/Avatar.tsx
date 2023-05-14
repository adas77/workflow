import Image from "next/image";
import Link from "next/link";

type Props = {
  image: string | null;
  href?: string | null;
};

const Avatar = ({ image, href }: Props) => {
  const img = image || "/img/unknown.jpg";
  return (
    <Link href={href || ""}>
      <div className="avatar-group -space-x-6">
        <div className="avatar cursor-pointer">
          <div className="w-12">
            <Image
              height={48}
              width={48}
              src={img}
              alt={`${img}'s avatar image`}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Avatar;
