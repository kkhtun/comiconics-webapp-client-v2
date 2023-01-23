import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import ComicCard from "../../components/ComicCard/ComicCard";
import ComicFilterBar from "../../components/ComicFilterBar/ComicFilterBar";
import Paginator from "../../components/Paginator/Paginator";
import environment from "../../configs/environment";
import useFetchDataList from "../../hooks/useFetchDataList";

function Browse() {
    const limit = 10;
    const { response, setQueries } = useFetchDataList({
        url: `${environment.url}/api/v1/comics`,
        initialQueries: { limit },
    });

    const [comics, setComics] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setComics(response.data);
        setCount(response.count);
    }, [response]);

    const onPageChange = ({ skip }) => {
        setQueries((prevQueries) => ({ ...prevQueries, skip }));
    };

    const onFilter = ({ genres, search }) => {
        let queries = { skip: 0, limit };
        if (genres && genres.length) {
            queries = { ...queries, genres: genres.join(",") };
        }
        if (search) {
            queries = { ...queries, search };
        }
        setQueries(queries);
    };

    return (
        <>
            <ComicFilterBar onFilter={onFilter} />
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    {comics &&
                        comics.map((comic) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={comic._id}
                            >
                                <ComicCard comic={comic} />
                            </Grid>
                        ))}
                </Grid>
                <Paginator
                    onPageChange={onPageChange}
                    limit={limit}
                    count={count}
                />
            </Container>
        </>
    );
}

export default Browse;
