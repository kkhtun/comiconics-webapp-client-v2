import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import * as R from "ramda";
import { useNavigate } from "react-router-dom";

export default function ComicCard({ comic }) {
    const {
        _id,
        title,
        thumbnail,
        genres = [],
        likeCount,
        description,
    } = comic || {};

    const [imageWidth, setImageWidth] = useState(150);
    const [textWidth, setTextWidth] = useState(null);
    const navigate = useNavigate();
    // Card's ref to determine image width
    const cardRef = useRef(null);

    const { width } = useWindowDimensions();
    useEffect(() => {
        const imageWidth = (cardRef.current.offsetWidth * 3) / 7;
        setImageWidth(imageWidth);
        setTextWidth(cardRef.current.offsetWidth - imageWidth);
    }, [width]);

    return (
        <Card
            sx={{
                display: "flex",
                ":hover, :focus": {
                    cursor: "pointer",
                    transform: "scale(1.01)",
                    transition: "0.3s",
                },
            }}
            ref={cardRef}
            onClick={() => navigate(`/comic/${_id}`)}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <CardContent
                    sx={{
                        flex: "1 0 auto",
                        overflow: "hidden",
                        maxWidth: textWidth,
                    }}
                >
                    <Typography
                        component="div"
                        variant="h5"
                        sx={{
                            overflow: "hidden", // at most 3 lines allowed for title
                            height: "4.5rem",
                            lineHeight: "1.5rem",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                        sx={{
                            mb: 1,
                            overflow: "hidden",
                            height: "4rem", // at most 4 lines allowed for description
                            lineHeight: "1rem",
                        }}
                    >
                        {description}
                    </Typography>
                    <Tooltip title={genres.map(R.prop("name")).join(", ")}>
                        <Box
                            sx={{
                                overflow: "hidden",
                                height: "48px",
                            }}
                        >
                            {genres.map(({ _id, name }) => (
                                <Chip label={name} size="small" key={_id} />
                            ))}
                        </Box>
                    </Tooltip>
                </CardContent>
                <CardActions sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="Like Count">
                            <FavoriteIcon sx={{ m: 1 }} />
                        </Tooltip>
                        <Typography variant="body2" color="text.secondary">
                            {likeCount}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="Chapter Count">
                            <MenuBookIcon sx={{ m: 1 }} />
                        </Tooltip>
                        <Typography variant="body2" color="text.secondary">
                            3
                        </Typography>
                    </Box>
                </CardActions>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: imageWidth }}
                image={thumbnail}
                alt={title || "Comic Cover"}
            />
        </Card>
    );
}
