// icon:ray-end | Material Design Icons https://materialdesignicons.com/ | Austin Andrews
import * as React from "react";

function EndArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M20 9c-1.31 0-2.42.83-2.83 2H2v2h15.17c.41 1.17 1.52 2 2.83 2a3 3 0 003-3 3 3 0 00-3-3z" />
    </svg>
  );
}

export default EndArrowIcon;
