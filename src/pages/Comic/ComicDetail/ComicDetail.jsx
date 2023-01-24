import {
    Avatar,
    Box,
    Card,
    CardMedia,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareIcon from "@mui/icons-material/Share";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ReplayIcon from "@mui/icons-material/Replay";
import ListAltIcon from "@mui/icons-material/ListAlt";
import * as R from "ramda";
import moment from "moment";
import { red, green, blue } from "@mui/material/colors";
import { shuffle } from "../../../helpers/utils";

export default function ComicDetail({ comic }) {
    const {
        _id,
        title,
        description,
        thumbnail,
        chaptersCount,
        genres,
        likeCount,
        liked,
        updatedAt,
    } = comic || {};

    const randomRgbMuiColors = shuffle([red[100], green[100], blue[100]]);

    // Manage Like/Unlike logic
    const [hasLiked, setHasLiked] = useState(false);
    const [comicLikeCount, setComicLikeCount] = useState(0);

    useEffect(() => {
        setHasLiked(!!liked);
        setComicLikeCount(likeCount);
    }, [likeCount, liked]);

    const likeOrUnlikeComic = async (comic_id) => {
        if (!auth.token) return alert("Please login to like comics");
        try {
            // change to liked in UI first, later sync with server response
            setComicLikeCount(
                hasLiked ? comicLikeCount - 1 : comicLikeCount + 1
            );
            setHasLiked(!hasLiked);
            const { data } = await axios.patch(
                `${environment.url}/api/v1/comics/${comic_id}/likes`
            );
            setHasLiked(data.liked);
            setComicLikeCount(data.likeCount);
        } catch (err) {
            alert(
                err.response.status === 422
                    ? "Please login to like comics"
                    : err.response.data.message
            );
        }
    };

    return (
        <Card sx={{ my: 2, py: 4, px: 2 }}>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {comic ? (
                        <Box>
                            <CardMedia
                                component="img"
                                image={thumbnail}
                                sx={{ borderRadius: 1 }}
                                alt={title || "Comic Cover"}
                            />
                        </Box>
                    ) : (
                        <></>
                    )}
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton aria-label="like">
                                <FavoriteIcon />
                                {/* <FavoriteBorderOutlinedIcon /> */}
                            </IconButton>
                            <Typography>{likeCount}</Typography>
                        </Box>
                        <IconButton aria-label="like">
                            <ShareIcon />
                        </IconButton>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={6} sx={{ pr: 2 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                    <List
                        sx={{
                            width: "100%",
                        }}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    variant="square"
                                    sx={{
                                        bgcolor: randomRgbMuiColors[0],
                                    }}
                                >
                                    <MenuBookIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Chapters"
                                secondary={chaptersCount}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    variant="square"
                                    sx={{
                                        bgcolor: randomRgbMuiColors[1],
                                    }}
                                >
                                    <ListAltIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Genres"
                                secondary={
                                    genres
                                        ? genres.map(R.prop("name")).join(", ")
                                        : ""
                                }
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    variant="square"
                                    sx={{
                                        bgcolor: randomRgbMuiColors[2],
                                    }}
                                >
                                    <ReplayIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Last Updated"
                                secondary={moment(updatedAt).fromNow()}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Card>
    );
}
