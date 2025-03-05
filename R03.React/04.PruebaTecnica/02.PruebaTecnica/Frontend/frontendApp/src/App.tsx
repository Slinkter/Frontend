import { useState } from "react";
import "./App.css";

const APP_STATUS = {
    IDLE: "idle",
    ERROR: "error",
    READY_UPLOAD: "ready_upload",
    UPLOADING: "uploading",
    READY_USAGE: "ready_usage",
} as const;

type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

function App() {
    const [appStatus, setAppStatus] = useState(APP_STATUS.IDLE);
    const [file, setFile] = useState<File | null>(null);
    const [count, setCount] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [file] = e.target.files ?? [];
        console.log(file);
    };

    if (file) {
        setFile(file);
        setAppStatus(APP_STATUS.READY_UPLOAD);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("todo");
    };

    return (
        <>
            <h4>Challge : Upload CVS + Search</h4>
            <div>
                <form action="" onSubmit={handleSubmit}>
                    <label>
                        <input
                            name="file"
                            type="file"
                            accept=".csv"
                            onChange={handleInputChange}
                        />
                    </label>
                    <button>Subir archivo</button>
                </form>
            </div>
        </>
    );
}

export default App;
