interface TitleProps {
  text: string;
}

function Title({ text }: TitleProps) {
  return(
    <h2 className="section-header-title">{ text }</h2>
  );
}

export default Title;