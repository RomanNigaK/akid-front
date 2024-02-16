interface IPropsSubmit {
  id: string;
}
export default function Submit({ id }: IPropsSubmit) {
  return <input type="submit" id={id} style={{ display: "none" }} />;
}
