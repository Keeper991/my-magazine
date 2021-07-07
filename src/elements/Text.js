import styled from "styled-components";

const Text = (props) => {
  const { header, children, bold, margin, half, center } = props;
  const styles = { bold, margin, half, center };
  return (
    <>
      {header ? (
        <ElHeader>{children}</ElHeader>
      ) : (
        <ElText {...styles}>{children}</ElText>
      )}
    </>
  );
};

Text.defaultProps = {
  children: null,
  header: false,
  bold: false,
  half: false,
  center: false,
  margin: "1em 0",
};

const ElText = styled.p`
  ${({ bold }) => (bold ? `font-weight: 700;` : "")}
  margin: ${({ margin }) => margin};
  word-break: break-all;
  ${({ half }) => (half ? `width: 50%;` : "")}
  text-align: ${({ center }) => (center ? "center" : "left")};
`;

const ElHeader = styled.h1``;

export default Text;
