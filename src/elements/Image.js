import styled from "styled-components";

const Image = (props) => {
  const { avatar, url } = props;

  return (
    <>
      {avatar ? (
        <Avatar url={url} />
      ) : (
        <AspectOutter>
          <AspectInner url={url} />
        </AspectOutter>
      )}
    </>
  );
};

Image.defaultProps = {
  avatar: false,
  url: "",
};

const AspectOutter = styled.div`
  width: 100%;
`;

const AspectInner = styled.div`
  padding-top: 75%;
  ${(props) =>
    props.url
      ? `background-image: url(${props.url});`
      : `background-image: url(https://i.imgur.com/QS2IK6E.png);`}
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  /* border-radius: 50%; */
  ${(props) =>
    props.url
      ? `background-image: url(${props.url});`
      : `background-image: url(https://i.imgur.com/vfagKjd.png);`}
  background-size: cover;
  background-position: center;
`;

export default Image;
