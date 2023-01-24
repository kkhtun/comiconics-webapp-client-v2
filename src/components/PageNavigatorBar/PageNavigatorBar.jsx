import {
    Box,
    Button,
    Card,
    CardActions,
    Container,
    Divider,
    FormControlLabel,
    Menu,
    MenuItem,
    Slider,
    Switch,
    Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SettingsIcon from "@mui/icons-material/Settings";
import WidthNormalIcon from "@mui/icons-material/WidthNormal";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

import "./PageNavigatorBar.css";

function PageNavigatorBar({
    currentPage = 1,
    setCurrentPage = () => {},
    isScrollMode = false,
    setIsScrollMode = (event) => {},
    pageWidth = 100,
    setPageWidth = () => {},
    chapterTitle = "Chapter Title",
    totalPages = 25,
}) {
    // Handle Reader Settings Opener (UI)
    const [settingAnchorElUser, setSettingAnchorElUser] = useState(null);
    const handleOpenReaderSetting = (event) => {
        setSettingAnchorElUser(event.currentTarget);
    };
    const handleCloseReaderSetting = () => {
        setSettingAnchorElUser(null);
    };

    // Page Change Handlers
    const goToPrevPage = () => {
        if (currentPage <= 1) return;
        setCurrentPage(currentPage - 1);
    };
    const goToNextPage = () => {
        if (currentPage >= totalPages) return;
        setCurrentPage(currentPage + 1);
    };

    // Back to Chapter List
    const backToChapterList = () => {
        // navigate
        window.history.back();
    };
    return (
        <Card sx={{ padding: 0, my: 1 }}>
            <Container maxWidth="xl">
                <CardActions
                    className="page-navigator-bar-card-action"
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Button size="small" onClick={backToChapterList}>
                            <ArrowBackIcon />
                        </Button>
                    </Box>
                    {isScrollMode ? (
                        <></>
                    ) : (
                        <Box>
                            <Button size="small" onClick={goToPrevPage}>
                                <ArrowBackIosNewIcon />
                            </Button>
                            <Typography
                                sx={{ display: "inline" }}
                                fontSize={18}
                            >
                                {currentPage}/{totalPages}
                            </Typography>
                            <Button size="small" onClick={goToNextPage}>
                                <ArrowForwardIosIcon />
                            </Button>
                        </Box>
                    )}
                    <Box>
                        <Button size="small" onClick={handleOpenReaderSetting}>
                            <SettingsIcon />
                        </Button>
                        {/* Menu for Reader Settings */}
                        <Menu
                            sx={{ mt: "45px" }}
                            anchorEl={settingAnchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(settingAnchorElUser)}
                            onClose={handleCloseReaderSetting}
                        >
                            <MenuItem
                                key={"Chapter Title"}
                                sx={{ pointerEvents: "none" }}
                            >
                                <Typography textAlign="center" fontSize={18}>
                                    {chapterTitle}
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem key={"Toggle Reading Mode"}>
                                <FormControlLabel
                                    control={<Switch />}
                                    label="Scroll Mode"
                                    checked={isScrollMode}
                                    onChange={(event) =>
                                        setIsScrollMode(event.target.checked)
                                    }
                                />
                            </MenuItem>
                            <MenuItem>
                                <WidthNormalIcon sx={{ mr: 2 }} />
                                <Slider
                                    aria-label="Page Width"
                                    defaultValue={100}
                                    valueLabelDisplay="auto"
                                    step={5}
                                    tooltip="Page Width"
                                    marks
                                    min={50}
                                    max={100}
                                    sx={{ mr: 1 }}
                                    value={pageWidth}
                                    onChange={(event) =>
                                        setPageWidth(event.target.value)
                                    }
                                />
                            </MenuItem>
                        </Menu>
                    </Box>
                </CardActions>
            </Container>
        </Card>
    );
}

export default PageNavigatorBar;
