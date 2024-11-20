import React, { useState } from "react";

const Component = (): JSX.Element => {
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    return (
        <section className="w-3/4 md:w-2/4">
            <h2>Event example</h2>
            <form
                action=""
                className="flex flex-col justify-center gap-6 w-full"
            >
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600 "
                    >
                        Text
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="hola"
                        className="inpunt-custom "
                    />
                </div>
                {/*  */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600 "
                    >
                        email
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="email"
                        className="inpunt-custom "
                    />
                </div>

                <button className="mt-2 button-custom ">submit</button>
            </form>
            <br />
        </section>
    );
};

export default Component;
