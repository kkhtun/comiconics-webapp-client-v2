import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    SwipeableDrawer,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = [
    { display: "Home", link: "/" },
    { display: "Browse", link: "/browse" },
    { display: "Login", link: "/login" },
];
const userSettings = ["Profile", "Account", "Favorites", "Logout"];

function CustomAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNavMenu = () => {
        // Sidenav open here
        setIsDrawerOpen(true);
    };

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <IconButton
                                    size="large"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                            <AdbIcon sx={{ ml: 1, mr: 2 }} />
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pages.map(({ display, link }) => (
                                <Button
                                    key={link} // register link handlers here for desktop
                                    sx={{
                                        my: 1,
                                        display: "block",
                                        fontSize: "1.1rem",
                                    }}
                                    onClick={() => navigate(link)}
                                >
                                    {display}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                            <Tooltip title="User Settings">
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar children="K"></Avatar>
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{ mt: "45px" }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {userSettings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu} // register user setting link handlers
                                    >
                                        <Typography
                                            textAlign="center"
                                            fontSize={18}
                                        >
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <CustomDrawer
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
            />
        </>
    );
}

function CustomDrawer({ isDrawerOpen, setIsDrawerOpen }) {
    const anchor = "left";

    const onDrawerOpen = () => {
        setIsDrawerOpen(true);
    };
    const onDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const drawerMenuList = [
        {
            display: "Home",
            icon: <HomeIcon />,
            link: "/",
        },
        {
            display: "Genres",
            icon: <ListAltIcon />,
            link: "/genres",
        },
        {
            display: "Login",
            icon: <LoginIcon />,
            link: "/login",
        },
    ];

    return (
        <SwipeableDrawer
            anchor={anchor}
            open={isDrawerOpen}
            onClose={onDrawerClose}
            onOpen={onDrawerOpen}
        >
            <Box
                sx={{
                    width: 250,
                }}
                role="presentation"
                onClick={() => setIsDrawerOpen(false)}
                onKeyDown={() => setIsDrawerOpen(false)}
            >
                <List>
                    {drawerMenuList.map(({ display, icon, link }) => (
                        <ListItem key={link} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={display} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </SwipeableDrawer>
    );
}

export default CustomAppBar;
