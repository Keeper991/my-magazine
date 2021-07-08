import { Button, Grid } from "../elements";
import Post from "../components/Post";
import { Add } from "@material-ui/icons";
import { history } from "../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import Permit from "../shared/Permit";
import { actionCreators as postActions } from "../redux/modules/post";
import { useEffect } from "react";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = () => {
  const postList = useSelector((store) => store.post.list);
  const paging = useSelector((store) => store.post.paging);
  const isLoading = useSelector((store) => store.post.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postActions.loadPostFB());
  }, [dispatch]);
  return (
    <InfinityScroll
      isNext={paging?.end}
      isLoading={isLoading}
      onScroll={() => {
        dispatch(postActions.loadPostFB(paging?.end));
      }}
    >
      <Grid>
        {postList.map((post) => (
          <Post
            key={post.id}
            {...post}
            onClick={() => {
              history.push(`/detail/${post.id}`);
              window.scrollTo(0, 0);
            }}
          />
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
    </InfinityScroll>
  );
};

export default PostList;
