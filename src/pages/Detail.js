import { Grid, Image, Text, Button, Input } from "../elements";
import { Create } from "@material-ui/icons";
import Permit from "../shared/Permit";
import Post from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionCreators as postActions } from "../redux/modules/post";
import { auth } from "../shared/firebase";

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const postList = useSelector((store) => store.post.list);
  const post = postList.find((p) => p.id === id);
  const user = auth.currentUser;

  useEffect(() => {
    if (!post) {
      dispatch(postActions.loadOnePostFB(id));
    }
  }, [dispatch, post, id]);

  return (
    <Grid>
      {post && user?.uid === post.author.uid ? (
        <Post edit remove {...post} id={id} />
      ) : (
        post && <Post {...post} id={id} />
      )}
      {/* <Permit>
        <Grid flex term>
          <Image avatar />
          <Input placeholder="댓글 달기" />
          <Button>
            <Create />
          </Button>
        </Grid>
      </Permit>
      <Grid flex justifyContent="flex-start">
        <Image avatar />
        <Text>맛있어 보여요!!</Text>
      </Grid> */}
    </Grid>
  );
};

export default Detail;
