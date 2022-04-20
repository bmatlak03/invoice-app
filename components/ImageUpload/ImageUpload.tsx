import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Box, Modal, Typography, useTheme } from "@mui/material";
import StyledButton from "../UI/StyledButton/StyledButton";
type Props = {
  file: Blob;
  close: () => void;
  onSubmit: (...args: Blob[]) => Promise<void>;
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
  const cropRef = useRef<AvatarEditor>(null);
  console.log(cropRef);
  const theme = useTheme();

  useEffect(() => {
    const fr: FileReader = new FileReader();
    fr.onload = () => {
      const base64data = fr.result as string;
      setImageSrc(base64data);
    };
    fr.readAsDataURL(file);
  }, [file]);
  const handleUpload = () => {
    if (crop && cropRef) {
      const canvas = cropRef?.current?.getImageScaledToCanvas().toDataURL();
      if (!canvas) throw new Error("Adding avatar went wrong");
      fetch(canvas)
        .then((res) => res.blob())
        .then((blob: Blob) => onSubmit(blob));
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
