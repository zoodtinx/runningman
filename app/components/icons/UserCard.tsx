import React from "react";

const UserSettings: React.FC<React.SVGProps<SVGSVGElement>> = ({
   className,
   ...props
}) => {
   return (
      <svg
         width="24"
         height="25"
         viewBox="0 0 24 25"
         stroke="currentColor"
         strokeWidth="2"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
         className={className}
         {...props}
      >
         <rect x="2" y="5.25732" width="20.5" height="14.5" rx="3.5" />
         <path d="M15 10.7573H19" strokeLinecap="round" />
         <path d="M15 14.2573H19" strokeLinecap="round" />
         <circle cx="9" cy="10.7573" r="2" />
         <path
            d="M12 15.7573C12 14.1005 10.6569 12.7573 9 12.7573C7.34315 12.7573 6 14.1005 6 15.7573"
            strokeLinecap="round"
         />
      </svg>
   );
};

export default UserSettings;
