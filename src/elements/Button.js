import styled from "styled-components";
import color from "../shared/Color";

const Button = (props) => {
  const { children, bgColor, color, full, circle, onClick, margin } = props;
  const styles = { bgColor, color, full, margin };
  return (
    <>
      {circle ? (
        <ElCircleButton {...styles} onClick={onClick}>
          {children}
        </ElCircleButton>
      ) : (
        <ElButton {...styles} onClick={onClick}>
          {children}
        </ElButton>
      )}
    </>
  );
};

Button.defaultProps = {
  children: null,
  bgColor: color.gray,
  color: color.black,
  full: false,
  circle: false,
  margin: "0",
  onClick: () => {},
};

const ElButton = styled.button`
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  ${({ full }) => (full ? `width: 100%;` : "")};
  margin: ${({ margin }) => margin};
`;

const ElCircleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
`;

export default Button;
