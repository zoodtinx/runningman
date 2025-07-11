import React from "react";

const NiceSettings: React.FC<React.SVGProps<SVGSVGElement>> = ({
   className,
   ...props
}) => {
   return (
      <svg
         width="24"
         height="24"
         stroke="currentColor"
         strokeWidth="2"
         viewBox="0 0 24 24"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={className}
         {...props}
      >
         <circle cx="15.6667" cy="7.47625" r="2.71429" />
         <line
            x1="3.67857"
            y1="7.70229"
            x2="12.2738"
            y2="7.70229"
            strokeLinecap="round"
         />
         <line
            x1="19.0596"
            y1="7.70229"
            x2="21.3215"
            y2="7.70229"
            strokeLinecap="round"
         />
         <circle
            cx="9.33332"
            cy="16.5238"
            r="2.71429"
            transform="rotate(-180 9.33332 16.5238)"
         />
         <line
            x1="21.3214"
            y1="16.2977"
            x2="12.7262"
            y2="16.2977"
            strokeLinecap="round"
         />
         <line
            x1="5.94045"
            y1="16.2977"
            x2="3.67854"
            y2="16.2977"
            strokeLinecap="round"
         />
      </svg>
   );
};

export default NiceSettings;
