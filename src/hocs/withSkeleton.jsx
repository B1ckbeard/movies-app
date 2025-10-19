import Skeleton from "../components/Skeleton/Skeleton";

function withSkeleton(Component, count) {
  return function WithSkeleton(props) {
    const { isLoading, type, ...restProps } = props;
    if (isLoading) {
      return <Skeleton type={type} count={count} />;
    }
    return <Component type={type} {...restProps} />;
  };
}

export default withSkeleton;
