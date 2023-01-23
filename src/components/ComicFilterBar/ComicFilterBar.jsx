import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Chip,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import * as R from "ramda";
import useFetchDataList from "../../hooks/useFetchDataList";
import environment from "../../configs/environment";

function ComicFilterBar({
    search = "",
    setSearch = () => {},
    setSelectedGenreIds = () => {},
    onFilter = (event) => {},
}) {
    const theme = useTheme();
    const inputFieldWidthAdjustments = {
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            mb: 1.5,
        },
    };
    const [genres, setGenres] = useState([]);
    const [selectedGenreObjects, setSelectedGenreObjects] = useState([]);

    const { response } = useFetchDataList({
        url: `${environment.url}/api/v1/genres`,
        initialQueries: { limit: 0 },
    });

    useEffect(() => {
        response.data &&
            setGenres(R.map(R.pick(["_id", "name"]), response.data));
    }, [response]);

    // Handlers
    const onGenreSelect = (event) => {
        const selectedIds = event.target.value;
        setSelectedGenreIds(selectedIds);
        const genresSelected = R.pipe(
            R.filter(R.propSatisfies(R.flip(R.includes)(selectedIds), "_id"))
        )(genres);
        setSelectedGenreObjects(genresSelected);
    };

    // Helper for string display in multiple select
    const concatSelectedGenreNamesFromId = (selectedIds) => {
        return R.pipe(
            R.filter(R.propSatisfies(R.flip(R.includes)(selectedIds), "_id")),
            R.map(R.prop("name")),
            R.join(", ")
        )(genres);
    };

    return (
        <Container maxWidth="xl" sx={{ my: 2 }}>
            <Card
                sx={{
                    display: { sm: "block", md: "flex" },
                    alignItems: "center",
                    px: 2,
                    py: 1,
                }}
            >
                <CardActions
                    sx={{
                        display: "flex",
                        [theme.breakpoints.down("sm")]: {
                            flexDirection: "column",
                        },
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="Search"
                        size="small"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        sx={{ ...inputFieldWidthAdjustments, minWidth: 200 }}
                    />
                    <FormControl
                        sx={{
                            mr: 1,
                            ...inputFieldWidthAdjustments,
                            minWidth: 200,
                            [theme.breakpoints.up("sm")]: {
                                maxWidth: 200,
                            },
                            [theme.breakpoints.up("md")]: {
                                maxWidth: 300,
                            },
                        }}
                    >
                        <InputLabel id="genre-select-label" size="small">
                            Genres
                        </InputLabel>
                        <Select
                            labelId="genre-select-label"
                            label="Genres"
                            value={selectedGenreObjects.map(R.prop("_id"))}
                            size="small"
                            multiple
                            renderValue={concatSelectedGenreNamesFromId}
                            onChange={onGenreSelect}
                        >
                            {genres.map(({ _id, name }) => (
                                <MenuItem value={_id} key={_id}>
                                    <Checkbox
                                        checked={selectedGenreObjects
                                            .map(R.prop("_id"))
                                            .includes(_id)}
                                    />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        endIcon={<SearchIcon />}
                        color="secondary"
                        sx={{ ...inputFieldWidthAdjustments }}
                        onClick={(event) => onFilter(event)}
                    >
                        <Typography>Filter</Typography>
                    </Button>
                </CardActions>
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        "&&": { p: 0 },
                    }}
                >
                    {selectedGenreObjects.map(({ name, _id }) => (
                        <Chip
                            label={name}
                            size="small"
                            key={_id}
                            sx={{ m: 1 }}
                        />
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
}

export default ComicFilterBar;
