// icon:ray-start-arrow | Material Design Icons https://materialdesignicons.com/ | Austin Andrews
import * as React from "react";

function StartArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M23 12l-4 4v-3H6.83A2.99 2.99 0 014 15a3 3 0 01-3-3 3 3 0 013-3c1.31 0 2.42.83 2.83 2H19V8l4 4z" />
    </svg>
  );
}

export default StartArrowIcon;
