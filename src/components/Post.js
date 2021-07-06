import { Grid, Button, Text, Image } from "../elements";
import { FavoriteBorder } from "@material-ui/icons";
import { history } from "../redux/configStore";

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
  } = props;
  return (
    <Grid
      onClick={() => {
        history.push(`/detail/${id}`);
        window.scrollTo(0, 0);
      }}
    >
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
        <Grid>
          <Text>{content}</Text>
          <Image url={imgUrl} />
        </Grid>
      ) : layout === "Right" ? (
        <Grid flex>
          <Text half>{content}</Text>
          <Image half url={imgUrl} />
        </Grid>
      ) : (
        <Grid flex flexDirection="row-reverse">
          <Text half>{content}</Text>
          <Image half url={imgUrl} />
        </Grid>
      )}

      <Grid flex>
        <Text>좋아요 {likeCnt}개</Text>
        <Button bgColor="transparent">
          <FavoriteBorder />
        </Button>
      </Grid>
      <Text margin="0 0">댓글 {commentCnt}개</Text>
    </Grid>
  );
};

export default Post;
