import { useDispatch } from "react-redux";
import { Grid, Text, Image, Button } from "../elements";
import { history } from "../redux/configStore";
import Like from "./Like";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
  const {
    id,
    author,
    imgUrl,
    content,
    layout,
    likeList,
    commentCnt,
    createdAt,
    onClick,
    edit,
    remove,
  } = props;
  const dispatch = useDispatch();
  return (
    <Grid>
      <Grid flex>
        <Grid flex term>
          <Image avatar url={author.imgUrl} />
          <Text>{author.name}</Text>
        </Grid>
        <Grid flex term>
          <Text>{createdAt}</Text>
          {edit && (
            <Button onClick={() => history.push(`/edit/${id}`)}>수정</Button>
          )}
          {remove && (
            <Button
              onClick={() => {
                const isRemove = window.confirm("삭제하시겠습니까?");
                if (isRemove) {
                  dispatch(postActions.removePostFB(id));
                }
              }}
            >
              삭제
            </Button>
          )}
        </Grid>
      </Grid>
      {layout === "Bottom" ? (
        <Grid onClick={onClick}>
          <Text>{content}</Text>
          <Image url={imgUrl} />
        </Grid>
      ) : layout === "Right" ? (
        <Grid flex onClick={onClick}>
          <Text center half>
            {content}
          </Text>
          <Image half url={imgUrl} />
        </Grid>
      ) : (
        <Grid flex flexDirection="row-reverse" onClick={onClick}>
          <Text center half>
            {content}
          </Text>
          <Image half url={imgUrl} />
        </Grid>
      )}
      <Like id={id} likeList={likeList} />
      {/* <Text margin="0 0">댓글 {commentCnt}개</Text> */}
    </Grid>
  );
};

Post.defaultProps = {
  edit: false,
  remove: false,
  onClick: () => {},
};

export default Post;
