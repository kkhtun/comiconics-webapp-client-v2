import { Card, CardContent, Container, Grid } from "@mui/material";
import ComicFilterBar from "../../components/ComicFilterBar/ComicFilterBar";

function Browse() {
    return (
        <>
            <ComicFilterBar />
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    {[1, 2, 3, 4].map((comic) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <CardContent>comic</CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default Browse;
