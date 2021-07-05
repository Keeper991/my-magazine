import { Button, Grid } from "../elements";
import Post from "../components/Post";
import { Add } from "@material-ui/icons";
import { history } from "../redux/configStore";

const PostList = () => {
  return (
    <Grid>
      <Post />
      <Button circle onClick={() => history.push("/create")}>
        <Add size="large" />
      </Button>
    </Grid>
  );
};

export default PostList;
