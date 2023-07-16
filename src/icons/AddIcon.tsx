const AddIcon = (props: React.SVGProps<SVGSVGElement>) => {
      return (
            <>
                  <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        {...props}
                  >
                        <path
                              d="M15 10H10V15H8V10H3V8H8V3H10V8H15V10Z"
                              fill="currentColor"
                        />
                  </svg>
            </>
      );
};

export default AddIcon;
