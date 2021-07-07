import { Grid, Text, Image } from "../elements";
import Like from "./Like";

const Post = (props) => {
  const {
    id,
    author,
    imgUrl,
    content,
    layout,
    likeCnt,
    commentCnt,
    createdAt,
    onClick,
  } = props;
  return (
    <Grid>
      <Grid flex>
        <Grid flex term>
          <Image avatar url={author.imgUrl} />
          <Text>{author.name}</Text>
        </Grid>
        <Grid flex term>
          <Text>{createdAt}</Text>
        </Grid>
      </Grid>
      {layout === "Bottom" ? (
        <Grid onClick={onClick}>
          <Text>{content}</Text>
          <Image url={imgUrl} />
        </Grid>
      ) : layout === "Right" ? (
        <Grid flex onClick={onClick}>
          <Text half>{content}</Text>
          <Image half url={imgUrl} />
        </Grid>
      ) : (
        <Grid flex flexDirection="row-reverse" onClick={onClick}>
          <Text half>{content}</Text>
          <Image half url={imgUrl} />
        </Grid>
      )}
      <Like id={id} likeCnt={likeCnt} />
      <Text margin="0 0">댓글 {commentCnt}개</Text>
    </Grid>
  );
};

Post.defaultProps = {
  onClick: () => {},
};

export default Post;
