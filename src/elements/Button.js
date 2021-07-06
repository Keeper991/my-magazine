import styled from "styled-components";
import color from "../shared/Color";

const Button = (props) => {
  const {
    children,
    bgColor,
    color,
    full,
    circle,
    onClick,
    margin,
    disabled,
    fixed,
    top,
    left,
  } = props;
  const styles = { bgColor, color, full, margin, fixed, top, left };
  return (
    <>
      {circle ? (
        <ElCircleButton {...styles} onClick={onClick}>
          {children}
        </ElCircleButton>
      ) : (
        <ElButton {...styles} onClick={onClick} disabled={disabled}>
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
  disabled: false,
  fixed: false,
  top: false,
  left: false,
  onClick: () => {},
};

const ElButton = styled.button`
  padding: 1em 1.5em;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  ${({ full }) => (full ? `width: 100%;` : "")};
  margin: ${({ margin }) => margin};
  ${({ disabled }) => (disabled ? `opacity: 0.4;` : "")}
`;

const ElCircleButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
  ${({ fixed }) => (fixed ? `position: fixed;` : "")}
  ${({ top }) => (top ? `top: ${top};` : "")}
  ${({ left }) => (left ? `left: ${left};` : "")}
`;

export default Button;
