import { Grid, Text, Button } from "../elements";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";
import { useState, useEffect } from "react";

const Like = (props) => {
  const { id, likeCnt } = props;
  const [isLike, setIsLike] = useState(false);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLike(user.likeList.includes(id));
  }, [id, user.likeList]);

  const handleClick = () => {
    dispatch(postActions.likePostFB(id, !isLike));
    setIsLike(!isLike);
  };

  return (
    <Grid flex>
      <Text>좋아요 {likeCnt}개</Text>
      <Permit>
        <Button bgColor="transparent" onClick={handleClick}>
          {isLike ? <Favorite /> : <FavoriteBorder />}
        </Button>
      </Permit>
    </Grid>
  );
};

export default Like;
