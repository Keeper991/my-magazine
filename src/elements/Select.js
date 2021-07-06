import styled from "styled-components";

const Select = (props) => {
  const { label, options, value, onChange } = props;
  return (
    <>
      <ElLabel>
        {label}
        <ElSelect value={value} onChange={onChange}>
          {options.map((opt) => (
            <ElOption value={opt}>{opt}</ElOption>
          ))}
        </ElSelect>
      </ElLabel>
    </>
  );
};

Select.defaultProps = {};

const ElSelect = styled.select`
  display: block;
`;

const ElOption = styled.option``;

const ElLabel = styled.label``;
export default Select;
