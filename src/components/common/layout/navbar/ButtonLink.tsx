import Link from "next/link";

const ButtonLink = ({
  icon,
  link,
}: {
  icon: React.ReactNode;
  link: string;
}) => {
  return <Link href={link}>{icon}</Link>;
};

export default ButtonLink;
