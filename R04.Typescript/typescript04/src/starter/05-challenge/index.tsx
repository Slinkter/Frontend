type BasicProfileCardProps = {
  type: "basic";
  name: string;
};
type AdvanceProfileCardProps = {
  type: "advance";
  name: string;
  email: string;
};

type ProfileCardProps = BasicProfileCardProps | AdvanceProfileCardProps;

function Component(props: ProfileCardProps) {
  console.log(props);

  if (props.type === "basic") {
    return (
      <article className=" alert alert-success">
        <h2>User : {props.name}</h2>
      </article>
    );
  }

  return (
    <article className=" alert alert-danger">
      <h2>User : {props.name}</h2>
      <h2>Email : {props.email}</h2>
    </article>
  );
}
export default Component;
