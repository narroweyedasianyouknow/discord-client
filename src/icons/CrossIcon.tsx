const CrossIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
      return (
            <svg width="18" height="18" {...props}>
                  <g fill="none" fillRule="evenodd">
                        <path d="M0 0h18v18H0"></path>
                        <path
                              stroke="currentColor"
                              d="M4.5 4.5l9 9"
                              strokeLinecap="round"
                        ></path>
                        <path
                              stroke="currentColor"
                              d="M13.5 4.5l-9 9"
                              strokeLinecap="round"
                        ></path>
                  </g>
            </svg>
      );
};
export default CrossIcon;
