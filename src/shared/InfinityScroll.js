import { useCallback, useEffect } from "react";
import _ from "lodash";

const InfinityScroll = (props) => {
  const { onScroll, children, isNext, isLoading } = props;

  const _handleScroll = _.throttle((e) => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // console.log(
    //   e.target.documentElement.scrollHeight,
    //   e.target.documentElement.scrollTop,
    //   e.target.documentElement.clientHeight,
    //   "/",
    //   scrollHeight,
    //   scrollTop,
    //   innerHeight
    // );
    if (scrollHeight - scrollTop - innerHeight < 200) {
      if (isLoading) {
        return;
      }
      onScroll(e);
    }
  }, 1000);
  const handleScroll = useCallback(_handleScroll, [isLoading, _handleScroll]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (isNext) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNext, isLoading, handleScroll]);

  return <>{children}</>;
};

InfinityScroll.defaultProps = {
  onScroll: () => {},
  children: null,
  isNext: false,
  isLoading: false,
};

export default InfinityScroll;
