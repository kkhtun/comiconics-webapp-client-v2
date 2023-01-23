import { Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomAppBar from "../../components/AppBar/CustomAppBar";
import Browse from "../Browse/Browse";
import Reader from "../Reader/Reader";

function Router() {
    return (
        <>
            <CustomAppBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/reader" element={<Reader />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;
