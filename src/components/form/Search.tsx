import closeSearchModal from "@static/icon/delete.svg";
import Input from "components/commons/Input";

type SearchFormProps = {
  onClose: () => void;
};

export default function SearchForm({ onClose }: SearchFormProps) {
  return (
    <form>
      <h3>
        Поиск в избранном
        <span>
          <img src={closeSearchModal} alt="" onClick={onClose} className="animation-rotate"/>
        </span>
      </h3>

      <Input placeholder="Поиск" name="search" />
    </form>
  );
}
