import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import Header from "../components/Header";
import { history } from "../redux/configStore";
import PostList from "../pages/PostList";
import PostForm from "../pages/PostForm";
import NoticeList from "../pages/NoticeList";
import Detail from "../pages/Detail";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Reject from "../components/Reject";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.signInCheckFB());
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/" component={PostList} exact />
        <Route path="/create" component={PostForm} />
        <Route path="/notice" component={NoticeList} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/edit/:id" component={PostForm} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/reject" component={Reject} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
