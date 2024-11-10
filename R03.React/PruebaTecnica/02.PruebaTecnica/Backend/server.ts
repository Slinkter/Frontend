import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import csvToJson from "convert-csv-to-json";

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

let userData: Array<Record<string, string>> = []; // Base de datos simulada

app.use(cors());

app.post(
    "/api/files",
    upload.single("file"),
    async (req: Request, res: Response) => {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ message: "File is required" });
        }
        if (file.mimetype !== "text/csv") {
            return res.status(400).json({ message: "File must be CSV" });
        }

        try {
            const rawCSV = file.buffer.toString("utf-8"); // Convertir a texto
            console.log(rawCSV);
            const json = csvToJson.csvStringToJson(rawCSV); // Convertir CSV a JSON
            userData = json;

            res.status(200).json({
                data: userData,
                message: "File uploaded successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error parsing the file" });
        }
    }
);

app.get("/api/users", (req: Request, res: Response) => {
    const q = req.query.q as string;
    if (!q) {
        return res.status(400).json({ message: "Query param 'q' is required" });
    }
    const search = q.toLowerCase();
    const filteredData = userData.filter((row) =>
        Object.values(row).some((value) => value.toLowerCase().includes(search))
    );

    res.status(200).json({ data: filteredData });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
