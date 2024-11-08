type Person = {
    name: string;
    email?: string;
    type: "basic" | "advanced";
};

function Component(props: Person) {
    return (
        <article
            className={
                props.type === "basic"
                    ? "alert alert-success"
                    : "alert alert-danger"
            }
        >
            <h2>User : {props.name}</h2>
            <h2>{props.email ? `Email : ${props.email}` : ""}</h2>
        </article>
    );
}
export default Component;
