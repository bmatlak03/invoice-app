import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Avatar } from "@mui/material";

type Props = {
  size?: "big" | "small";
  click: () => void;
};

const AvatarImg = ({ size = "small", click }: Props) => {
  const { avatar: imgSrc } = useSelector((state: RootState) => state.ui);
  const avatarStyles = {
    width: size === "big" ? 100 : 40,
    height: size === "big" ? 100 : 40,
    cursor: "pointer",
  };
  return (
    <Avatar sx={avatarStyles} onClick={click}>
      {imgSrc ? <Image src={imgSrc} alt="avatar" layout="fill" /> : null}
    </Avatar>
  );
};

export default AvatarImg;
