import useFetch from "./useFetch";

const useCatFact = () => {
    const { data, loading, error } = useFetch("https://catfact.ninja/fact");
    return { fact: data?.fact, loading, error };
};

export default useCatFact;
