import { PropsWithChildren } from "react";

type ComponentProps = PropsWithChildren<{
    name: string;
    id: number;
    children?: React.ReactNode;
}>;

function Component({ name, id, children }: ComponentProps) {
    return (
        <div>
            {children}
            <h2>Name : {name}</h2>
            <h2>Props :{id}</h2>
        </div>
    );
}
export default Component;
