import Image from "next/image";
import { Avatar } from "@mui/material";
import ProfilePicture from "../../assets/image-avatar.jpg";
import { useRouter } from "next/router";
const Account: React.FC = () => {
  const router = useRouter();
  return (
    <Avatar sx={{ cursor: "pointer" }} onClick={() => router.push("/profile")}>
      <Image src={ProfilePicture} alt="username" />
    </Avatar>
  );
};

export default Account;
