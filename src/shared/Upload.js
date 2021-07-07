import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Grid } from "../elements";
import colors from "./Color";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = () => {
  const [fileName, setFileName] = useState("선택된 이미지 없음");
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(imageActions.setPreview(null));
      dispatch(imageActions.setChanged(false));
    };
  }, [dispatch]);
  const handleChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      dispatch(imageActions.setPreview(reader.result));
      dispatch(imageActions.setChanged(true));
      setFileName(e.target.files[0].name);
    };
  };
  return (
    <Grid flex term>
      <FileName>{fileName}</FileName>
      <UploadBtn>
        이미지 선택
        <input
          style={{ display: "none" }}
          type="file"
          onChange={handleChange}
          accept="image/*"
          multiple
        />
      </UploadBtn>
    </Grid>
  );
};

const FileName = styled.div`
  width: 80%;
  border: none;
  border-bottom: 1px solid ${colors.black};
  padding: 6px;
`;

const UploadBtn = styled.label`
  font-size: 1em;
  background-color: ${colors.gray};
  width: 8em;
  padding: 1em 1.5em;
`;

export default Upload;
