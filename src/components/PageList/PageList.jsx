import { Container } from "@mui/material";
import { Image } from "mui-image";

function PageList({ currentPage, pages, scrollMode = false, pageWidth = 100 }) {
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {!scrollMode ? (
                <SinglePage page={currentPage} pageWidth={pageWidth} />
            ) : (
                <PageScroll pages={pages} pageWidth={pageWidth} />
            )}
        </Container>
    );
}

function SinglePage({ page, pageWidth }) {
    return page ? (
        <Image src={page} style={{ width: `${pageWidth}%` }} />
    ) : (
        <></>
    );
}

function PageScroll({ pages, pageWidth }) {
    return pages && pages.length ? (
        <>
            {pages.map((page, idx) => (
                <Image src={page} width={`${pageWidth}%`} key={idx} />
            ))}
        </>
    ) : (
        <></>
    );
}

export default PageList;
