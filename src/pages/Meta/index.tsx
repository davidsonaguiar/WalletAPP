import { AiOutlinePlus } from "react-icons/ai";
import Button from "../../component/Button";
import HeaderSection from "../../component/SectionHeader";
import MetaTable from "../../component/MetaTable";

function Meta() {
  return(
    <>
      <HeaderSection.Container>
        <HeaderSection.Title text="Minhas Metas" />
        <Button text="Metas" icon={AiOutlinePlus} handleClick={console.log} />
      </HeaderSection.Container>
      <MetaTable>
      </MetaTable>
    </>
  );
}

export default Meta;