import React from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

const TriangleDown: React.FC<SVGProps> = (props) => {
   return (
      <svg
         width="28"
         height="17"
         viewBox="0 0 28 17"
         fill="currentColor"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <path d="M14.3333 16.4445L0.765451 0.777711L27.9011 0.777714L14.3333 16.4445Z" />
      </svg>
   );
};

export default TriangleDown;
