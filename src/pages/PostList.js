import { Button, Grid } from "../elements";
import Post from "../components/Post";
import { Add } from "@material-ui/icons";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import Permit from "../shared/Permit";
import { actionCreators as postActions } from "../redux/modules/post";
import { useEffect } from "react";

const PostList = () => {
  const postList = useSelector((store) => store.post.list);
  const dispatch = useDispatch();
  useEffect(() => {
    if (postList.length < 2) {
      dispatch(postActions.loadPostFB());
    }
  }, [dispatch, postList.length]);
  return (
    <Grid>
      {postList.map((post) => (
        <Post key={post.id} {...post} />
      ))}
      <Permit>
        <Button
          top="90%"
          left="90%"
          fixed
          circle
          onClick={() => {
            history.push("/create");
            window.scrollTo(0, 0);
          }}
        >
          <Add size="large" />
        </Button>
      </Permit>
    </Grid>
  );
};

export default PostList;
