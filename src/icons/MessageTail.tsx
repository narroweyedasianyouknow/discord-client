const MessageTail = (props: { fromMe?: boolean; className: string }) => {
  return (
    <svg
      width="6"
      height="7"
      viewBox="0 0 6 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props?.className}
    >
      {!props?.fromMe ? (
        <path d="M0 7C0 7 5.91652 0.108738 6 0V7H0Z" fill="currentColor" />
      ) : (
        <path d="M6 7C6 7 0.0834785 0.108738 0 0V7H6Z" fill="currentColor" />
      )}
    </svg>
  );
};

export default MessageTail;
