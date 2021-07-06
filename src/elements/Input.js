import styled from "styled-components";

const Input = (props) => {
  const { id, label, multiLine, value, placeholder, onChange, padding, type } =
    props;
  const styles = { padding };
  return (
    <>
      {label ? <ElLabel htmlFor={id}>{label}</ElLabel> : ""}
      {multiLine ? (
        <ElTextArea
          {...styles}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        ></ElTextArea>
      ) : (
        <ElInput
          {...styles}
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
    </>
  );
};

Input.defaultProps = {
  placeholder: "",
  multiLine: false,
  label: false,
  id: "",
  value: "",
  padding: "15px",
  type: "text",
  onChange: () => {},
};

const ElInput = styled.input.attrs((props) => ({
  type: props.type,
}))`
  display: block;
  padding: ${({ padding }) => padding};
  width: 100%;
  &:active,
  &:focus {
    outline: none;
  }
`;

const ElTextArea = styled.textarea`
  display: block;
  padding: ${({ padding }) => padding};
  width: 100%;
  height: 30em;
  resize: none;
  &:active,
  &:focus {
    outline: none;
  }
`;

const ElLabel = styled.label``;

export default Input;
