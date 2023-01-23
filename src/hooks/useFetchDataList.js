import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchDataList({ url, initialQueries = {} }) {
    if (!url) throw new Error("[useFetchDataList] Please provide URL to fetch");
    // State
    const [queries, setQueries] = useState({
        limit: 5,
        skip: 0,
        ...initialQueries,
    });
    const [response, setResponse] = useState({});
    // Hook
    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(url, {
                    params: queries,
                });
                if (response.status === 200) return setResponse(response.data);
                throw new Error("Something went wrong");
            } catch (err) {
                const msg =
                    err.response?.data?.message || "Something went wrong";
                console.error(msg);
            }
        };
        fetchList();
    }, [queries, url]);

    return { response, setQueries };
}
