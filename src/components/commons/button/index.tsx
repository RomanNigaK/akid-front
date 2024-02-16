import loading from "@static/icon/circle.svg";
import ok from "@static/icon/ok.svg";
import { FetchStatus } from "redux/types";

type ButtonProps = {
  theme?: "blue" | "green";
  title: string;
  idHtml?: string;
  status?: FetchStatus;
  action?: () => void;
};

export default function Button({
  theme = "green",
  title,
  idHtml,
  status = FetchStatus.NotFetched,
  action,
}: ButtonProps) {

  const currentStatus = () => {
    switch (status) {
      case FetchStatus.Fetching:
        return <img src={loading} alt="" className="loader" />;
      case FetchStatus.Fetched:
        return <img src={ok} alt="" className="end-loader" />;
      case FetchStatus.NotFetched:
        return title;
      default:
        return title;
    }
  };

  return (
    <div className={`button ${theme}`} onClick={action ? () => action() : undefined}>
      <div className={`${theme}`}>
        <label htmlFor={idHtml}>{currentStatus()}</label>
      </div>
    </div>
  );
}
