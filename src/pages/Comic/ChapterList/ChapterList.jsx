import { Card, CardContent, Grid, Typography, CardMedia } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ChapterList({ comic }) {
    const { thumbnail, chapters } = comic || {};
    const navigate = useNavigate();
    return (
        <Grid container spacing={2}>
            {chapters &&
                chapters.map((chapter) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={chapter._id}>
                        <Card
                            sx={{
                                display: "flex",
                                height: "11rem",
                                ":hover, :focus": {
                                    cursor: "pointer",
                                    transform: "scale(1.01)",
                                    transition: "0.3s",
                                },
                            }}
                            onClick={() => navigate(`/reader/${chapter._id}`)}
                        >
                            <CardMedia
                                component="img"
                                sx={{ flexBasis: { xs: "30%", sm: "40%" } }}
                                image={chapter.thumbnail || thumbnail}
                                alt={chapter.title || "Chapter Cover"}
                            />
                            <CardContent
                                sx={{
                                    flexBasis: { xs: "70%", sm: "60%" },
                                    overflow: "hidden",
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    component="div"
                                    sx={{
                                        overflow: "hidden", // at most 3 lines allowed for title
                                        height: "3.6rem",
                                        lineHeight: "1.2rem",
                                    }}
                                >
                                    {chapter.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{
                                        overflow: "hidden",
                                        height: "4.8rem", // at most 4 lines allowed for description
                                        lineHeight: "1.2rem",
                                        fontSize: "1rem",
                                    }}
                                >
                                    {chapter.description || "[No Description]"}
                                </Typography>
                                <Typography
                                    color="secondary"
                                    variant="body2"
                                    sx={{ fontSize: "0.7rem" }}
                                >
                                    {moment(chapter.createdAt).fromNow()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
}
