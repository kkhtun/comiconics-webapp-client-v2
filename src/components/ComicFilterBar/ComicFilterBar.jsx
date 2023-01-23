import {
    Box,
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
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import * as R from "ramda";
import useFetchDataList from "../../hooks/useFetchDataList";
import environment from "../../configs/environment";

function ComicFilterBar({ onFilter = () => {} }) {
    const theme = useTheme();
    const inputFieldWidthAdjustments = {
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            mb: 1.5,
        },
        minWidth: 150,
    };
    const [genres, setGenres] = useState([]);
    const [selectedGenreObjects, setSelectedGenreObjects] = useState([]);
    const [selectedGenreIds, setSelectedGenreIds] = useState([]);
    const [search, setSearch] = useState("");

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

    const onFilterButtonPressed = (event) => {
        onFilter({ genres: selectedGenreIds, search });
    };

    const onClearFilter = (event) => {
        setSelectedGenreIds([]);
        setSelectedGenreObjects([]);
        setSearch("");
        onFilter({ genres: [], search: "" });
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
                        sx={{ ...inputFieldWidthAdjustments }}
                    />
                    <FormControl
                        sx={{
                            mr: 1,
                            ...inputFieldWidthAdjustments,
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
                    <Box
                        sx={{
                            ...inputFieldWidthAdjustments,
                            display: "flex",
                            justifyContent: "space-between",
                            "&&": { marginLeft: 0 },
                        }}
                    >
                        <Button
                            variant="contained"
                            endIcon={<SearchIcon />}
                            color="secondary"
                            sx={{ flexBasis: "49%", minWidth: "5rem" }}
                            onClick={(event) => onFilterButtonPressed(event)}
                        >
                            <Typography>Filter</Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            endIcon={<ClearIcon />}
                            color="info"
                            sx={{ flexBasis: "49%", minWidth: "5rem" }}
                            onClick={(event) => onClearFilter(event)}
                        >
                            <Typography>Clear</Typography>
                        </Button>
                    </Box>
                </CardActions>
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        "&&": { p: 0 },
                        flexBasis: "30%",
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
