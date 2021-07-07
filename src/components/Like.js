import { Grid, Text, Button } from "../elements";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from "../shared/Permit";
import { useState, useEffect } from "react";
import { auth } from "../shared/firebase";

const Like = (props) => {
  const { id, likeList } = props;
  const [isLike, setIsLike] = useState(false);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLike(user.likeList.includes(id));
  }, [id, user.likeList]);

  const handleClick = () => {
    dispatch(
      postActions.likePostFB(id, auth.currentUser.uid, likeList, !isLike)
    );
    setIsLike(!isLike);
  };

  return (
    <Grid flex>
      <Text>좋아요 {likeList.length}개</Text>
      <Permit>
        <Button bgColor="transparent" onClick={handleClick}>
          {isLike ? (
            <Favorite style={{ color: "#fd79a8" }} />
          ) : (
            <Favorite style={{ color: "#b2bec3" }} />
          )}
        </Button>
      </Permit>
    </Grid>
  );
};

export default Like;
