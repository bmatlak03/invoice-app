import Image from "next/image";
import { Avatar } from "@mui/material";
import ProfilePicture from "../../assets/image-avatar.jpg";
const Account: React.FC = () => {
  return (
    <Avatar
      sx={{ cursor: "pointer" }}
      onClick={() => console.log("redirecting to account page")}
    >
      <Image src={ProfilePicture} alt="username" />
    </Avatar>
  );
};

export default Account;
