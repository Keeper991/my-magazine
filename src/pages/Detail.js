import { Grid, Image, Text, Button, Input } from "../elements";
import { FavoriteBorder, Create } from "@material-ui/icons";
import Permit from "../shared/Permit";

const Detail = () => {
  return (
    <>
      <Grid>
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
        <Permit>
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
        </Grid>
      </Grid>
    </>
  );
};

export default Detail;
