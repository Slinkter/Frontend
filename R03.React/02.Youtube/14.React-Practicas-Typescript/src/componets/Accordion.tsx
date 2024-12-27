import React, { useState } from "react";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
};

export const Accordion = (props: AccordionProps) => {
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <section>
                <h3>{props.title}</h3>
                <button onClick={() => setOpen(!open)}>
                    {open ? "close" : "open"}
                </button>
            </section>
            {open && <div>{props.children}</div>}
        </React.Fragment>
    );
};
