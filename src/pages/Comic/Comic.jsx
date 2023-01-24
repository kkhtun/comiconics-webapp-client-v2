import {
    Box,
    Button,
    Card,
    CardMedia,
    Container,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import environment from "../../configs/environment";
import ChapterList from "./ChapterList/ChapterList";
import ComicDetail from "./ComicDetail/ComicDetail";

export default function Comic() {
    const { comic_id } = useParams();
    const [comic, setComic] = useState({});

    // Fetch
    const fetchComic = useCallback(async () => {
        const { data } = await axios.get(
            `${environment.url}/api/v1/comics/${comic_id}`
        );
        setComic(data);
    }, [comic_id]);

    useEffect(() => {
        fetchComic().catch(console.error);
    }, [comic_id]);

    return (
        <Container maxWidth="xl" sx={{ mb: 10 }}>
            <ComicDetail comic={comic} />
            <ChapterList comic={comic} />
        </Container>
    );
}
