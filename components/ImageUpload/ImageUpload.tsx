import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Box, Modal, Typography, useTheme } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {
  file: any;
  close: () => void;
  onSubmit: any;
  crop: boolean;
  header: string;
};
const ImageUpload = ({
  file,
  close,
  onSubmit,
  crop = false,
  header = "Send This Image?",
}: Props) => {
  const [imageSrc, setImageSrc] = useState("");
  const cropRef: any = useRef();
  const theme = useTheme();

  useEffect(() => {
    const fr: any = new FileReader();
    fr.onload = () => {
      const base64data = fr.result;
      setImageSrc(base64data);
    };
    fr.readAsDataURL(file);
  }, [file]);
  const handleUpload = () => {
    if (crop && cropRef) {
      const canvas = cropRef.current.getImageScaledToCanvas().toDataURL();
      fetch(canvas)
        .then((res) => res.blob())
        .then((blob) => onSubmit(blob));
    } else {
      onSubmit();
    }
  };
  const modalStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 5,
    backgroundColor: theme.palette.primary.light,
  };
  return (
    <Modal open={true} sx={modalStyles}>
      <Box sx={boxStyles}>
        <Typography>{header}</Typography>
        <Box>
          {crop ? (
            <AvatarEditor
              ref={cropRef}
              width={200}
              height={200}
              border={50}
              image={imageSrc}
            />
          ) : (
            <Image src={imageSrc} alt="preview" />
          )}
        </Box>
        <Box>
          <StyledButton type="red" onClick={close}>
            Cancel
          </StyledButton>
          <StyledButton role="submit" onClick={handleUpload}>
            Upload
          </StyledButton>
        </Box>
      </Box>
    </Modal>
  );
};
export default ImageUpload;
