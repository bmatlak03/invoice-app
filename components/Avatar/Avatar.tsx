import { Avatar } from "@mui/material";

type Props = {
  size?: "big" | "small";
  click: () => void;
};

const AvatarImg = ({ size = "small", click }: Props) => {
  const avatarStyles = {
    width: size === "big" ? 100 : 40,
    height: size === "big" ? 100 : 40,
    cursor: "pointer",
  };
  return <Avatar sx={avatarStyles} onClick={click}></Avatar>;
};

export default AvatarImg;
