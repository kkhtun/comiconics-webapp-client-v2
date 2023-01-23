import { Box, Pagination } from "@mui/material";

export default function Paginator({
    onPageChange = () => {},
    count = 0,
    limit = 10,
}) {
    const handlePageChange = (event, pageNo) => {
        const skip = (pageNo - 1) * limit;
        onPageChange({ skip });
    };
    return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <Pagination
                color="secondary"
                shape="rounded"
                size="large"
                count={Math.ceil(count / limit)} // num of pages
                showFirstButton
                showLastButton
                onChange={handlePageChange}
            />
        </Box>
    );
}
