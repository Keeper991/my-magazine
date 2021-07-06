import { Text, Button, Grid } from "../elements";
import { history } from "../redux/configStore";

const Reject = () => {
  return (
    <Grid flex justifyContent="center">
      <Grid>
        <Text header>로그인 해주십시오.</Text>
        <Button onClick={() => history.push("/signin")}>로그인</Button>
      </Grid>
    </Grid>
  );
};

export default Reject;
