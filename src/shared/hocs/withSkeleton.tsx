import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import { ComponentType } from "react";

interface WithSkeletonProps {
  isLoading?: boolean;
  type?: "banner" | "item";
  direction?: "row" | "column" | "grid";
}

function withSkeleton<P extends object>(
  Component: ComponentType<P>,
  count: number
) {
  return function WithSkeleton(props: P & WithSkeletonProps) {
    const { isLoading, type, direction, ...restProps } = props;
    if (isLoading) {
      return <Skeleton direction={direction} count={count} />;
    }
    return <Component {...(restProps as P)} type={type} direction={direction} />;
  };
}

export default withSkeleton;
