import { Text, Button, Grid } from "../elements";
import { history } from "../redux/configStore";

const Reject = (props) => {
  return (
    <Grid flex justifyContent="center">
      <Grid>
        <Text header>권한이 없습니다.</Text>
        <Button onClick={() => history.push("/")}>메인으로</Button>
      </Grid>
    </Grid>
  );
};

export default Reject;
