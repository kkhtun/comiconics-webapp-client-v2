import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomAppBar from "../../components/AppBar/CustomAppBar";
import Browse from "../Browse/Browse";
import Comic from "../Comic/Comic";
import Reader from "../Reader/Reader";

function Router() {
    return (
        <>
            <BrowserRouter>
                <CustomAppBar />
                <Routes>
                    <Route path="/">
                        <Route path="/" element={<>Home Page</>} />
                        <Route path="/browse" element={<Browse />} />
                        <Route path="/login" element={<>Login Page</>} />

                        <Route path="/comic/:comic_id" element={<Comic />} />
                        <Route
                            path="/reader/:chapter_id"
                            element={<Reader />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;
