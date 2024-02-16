import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLButtonElement>;

export default function IconButton(props: Props) {
  const { children } = props;
  return <button {...props} className="icon-button">{children}</button>;
}
