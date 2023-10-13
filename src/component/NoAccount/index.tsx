interface NoDataProps {
  title: string
  text: string
}

function NoAccount({ text, title }: NoDataProps ) {
  return(
    <div className="no-account-container">
      <p className="no-account-message">{title}</p>
      <p className="no-account-tip">{text}</p>
    </div>
  );
}

export default NoAccount;