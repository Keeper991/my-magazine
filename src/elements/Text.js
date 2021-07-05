import styled from "styled-components";

const Text = (props) => {
  const { header, children, bold, margin } = props;
  const styles = { bold, margin };
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
  margin: "1em 0",
};

const ElText = styled.p`
  ${({ bold }) => (bold ? `font-weight: 700;` : "")}
  margin: ${({ margin }) => margin}
`;

const ElHeader = styled.h1``;

export default Text;
