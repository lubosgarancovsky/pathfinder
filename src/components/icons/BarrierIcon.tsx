// icon:bxs-traffic-barrier | Boxicons https://boxicons.com/ | Atisa
import * as React from "react";

function BarrierIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M21 6h-2V3h-2v3H7V3H5v3H3a1 1 0 00-1 1v7a1 1 0 001 1h2v6h2v-6h10v6h2v-6h2a1 1 0 001-1V7a1 1 0 00-1-1zM4.42 13l2.857-5H9.58l-2.857 5H4.42zm7.857-5h2.303l-2.857 5H9.42l2.857-5zm5 0h2.303l-2.857 5H14.42l2.857-5z" />
    </svg>
  );
}

export default BarrierIcon;
