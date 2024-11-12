import React, { useState } from "react";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
};

export const Accordion = (props: AccordionProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <button
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {open ? "close" : "open"}
                </button>
            </div>
            {open && <div>{props.children}</div>}
        </div>
    );
};
