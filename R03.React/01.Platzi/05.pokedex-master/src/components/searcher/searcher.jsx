import { Input } from "antd";
import { setSearchFilter } from "../../slices/dataSlice";
import { useDispatch } from "react-redux";

const Searcher = () => {
    const dispatch = useDispatch();

    const filterPokemon = (inputFilter) => {
        const inputFilterFormat = inputFilter.trim().toLowerCase();
        dispatch(setSearchFilter(inputFilterFormat));
    };

    return (
        <Input
            placeholder="Buscar..."
            style={{ marginBottom: 10 }}
            onChange={(event) => filterPokemon(event.target.value)}
        />
    );
};

export { Searcher };
