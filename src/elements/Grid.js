import styled from "styled-components";

const Grid = (props) => {
  const { flex, children, padding, term, justifyContent, onClick } = props;
  const styles = { flex, padding, term, justifyContent };
  return (
    <ElGrid {...styles} onClick={onClick}>
      {children}
    </ElGrid>
  );
};

Grid.defaultProps = {
  children: null,
  flex: false,
  padding: "7px 0",
  term: false,
  justifyContent: "space-between",
  onClick: () => {},
};

const ElGrid = styled.div`
  ${({ full }) => (full ? "width: 100%;" : "")}
  padding: ${({ padding }) => padding};
  ${({ flex, justifyContent }) =>
    flex
      ? `display: flex; justify-content: ${justifyContent}; align-items: center;`
      : ""}
  ${({ flex, term }) =>
    term && !flex
      ? `& > *:not(:last-child) { margin-bottom: 1em; }`
      : term && flex
      ? `& > *:not(:last-child) { margin-right: 1em; }`
      : ""}
`;

export default Grid;
