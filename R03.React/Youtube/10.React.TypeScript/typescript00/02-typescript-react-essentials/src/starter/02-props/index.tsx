import { type PropsWithChildren } from "react";

/* 
version 1
type ComponentProps = {
    titile: string;
    id: number;
    children?: React.ReactNode;
};
 */

type ComponentProps = PropsWithChildren<{
    titile: string;
    id: number;
}>;

function Component(props: ComponentProps) {
    return (
        <div>
            <h2>Name : {props.titile}</h2>
            <h2>Id: {props.id}</h2>
            {props.children}
        </div>
    );
}
export default Component;
