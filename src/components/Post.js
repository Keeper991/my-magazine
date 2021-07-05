import { Grid, Button, Text, Image } from "../elements";
import { FavoriteBorder } from "@material-ui/icons";
import { history } from "../redux/configStore";

const Post = (props) => {
  return (
    <Grid onClick={() => history.push("/detail")}>
      <Grid flex>
        <Grid flex term>
          <Image avatar />
          <Text>breadman</Text>
        </Grid>
        <Grid flex term>
          <Text>17시간 전</Text>
        </Grid>
      </Grid>
      <Text>빵이다!!</Text>
      <Image url="https://i.imgur.com/vlFwCsZ.jpg" />
      <Grid flex>
        <Text>좋아요 0개</Text>
        <Button bgColor="transparent">
          <FavoriteBorder />
        </Button>
      </Grid>
      <Text margin="0 0">댓글 0개</Text>
    </Grid>
  );
};

export default Post;
