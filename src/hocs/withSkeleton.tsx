import Skeleton from "@/components/Skeleton/Skeleton";
import { ComponentType } from "react";

interface WithSkeletonProps {
  isLoading?: boolean;
  type?: string;
}

function withSkeleton<P extends object>(
  Component: ComponentType<P>,
  count: number
) {
  return function WithSkeleton(props: P & WithSkeletonProps) {
    const { isLoading, type, ...restProps } = props;
    if (isLoading) {
      return <Skeleton type={type} count={count} />;
    }
    return <Component {...(restProps as P)} type={type} />;
  };
}

export default withSkeleton;
