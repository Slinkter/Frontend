import { Input } from "antd";
import { setSearchFilter } from "../../slices/dataSlice";
import { useDispatch } from "react-redux";

const Searcher = () => {
    const dispatch = useDispatch();

    const handleChange = (inputText) => {
        const text = inputText.trim().toLowerCase();
        dispatch(setSearchFilter(text));
    };

    return (
        <Input
            placeholder="Buscar..."
            style={{ marginBottom: 10 }}
            onChange={(e) => handleChange(e.target.value)}
        />
    );
};

export { Searcher };
