import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import { Avatar, Button } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ColorModeSelect from '../components/shared-theme/ColorModeSelect';
import ChatInput from '../components/ChatInput';
import { deleteUserChats, get, getUserChats, sendChatRequest } from '../services/api-services';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../modules/context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { red } from '@mui/material/colors';
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import toast from "react-hot-toast";
export default function PrimarySearchAppBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [chatMessages, setChatMessages] = React.useState([]);
    const navigate = useNavigate();
    const inputRef = React.useRef(null);
    const auth = useAuth();
    const [loading, setLoading] = React.useState(false)
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const drawerWidth = 240;
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };
    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };
    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const handleogout = () => {
        auth.logout();
        navigate("/signIn")

    }

  const handleSubmit = async (e) => {
  e?.preventDefault();
  const content = inputRef.current?.value?.trim();
  if (!content) return;
  setLoading(true);
  const newMessage = { role: "user", content };
  setChatMessages((prev) => [...prev, newMessage]);
  inputRef.current.value = "";
  try {
    const chatData = await sendChatRequest(content);
    setChatMessages((prev) => [
      ...prev,
      ...chatData.chats,
    ]);
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
};
const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSubmit(e);
  }
};


    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", { id: "deletechats" });
            await deleteUserChats();
            setChatMessages([]);
            toast.success("Deleted Chats Successfully", { id: "deletechats" });
        } catch (error) {
            console.log(error);
            toast.error("Deleting chats failed", { id: "deletechats" });
        }
    };
    React.useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            //   toast.loading("Loading Chats", { id: "loadchats" });
            getUserChats()
                .then((data) => {
                    setChatMessages([...data.chats]);
                    //   toast.success("Successfully loaded chats", { id: "loadchats" });
                })
                .catch((err) => {
                    console.log(err);
                    //   toast.error("Loading Failed", { id: "loadchats" });
                });
        }
    }, [auth]);
    React.useEffect(() => {
        if (!auth?.user) {
            return navigate("/signIn");
        }
        navigate("/");
    }, [auth]);
    const drawer = (

        <Box
            sx={{
                display: { md: "flex", xs: "none", sm: "none" },
                flex: 0.2,
                flexDirection: "column",
                mx: 1
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    // width: "100%",
                    // height: "60vh",
                    // bgcolor: "rgb(17,29,39)",
                    bgcolor: "background.paper",
                    borderRadius: 5,
                    flexDirection: "column",
                }}
            >
                <Avatar
                    sx={{
                        mx: "auto",
                        my: 2,
                        bgcolor: "white",
                        color: "black",
                        fontWeight: 700,
                    }}
                >
                    {auth?.user?.name[0]}
                    {auth?.user?.name.split(" ")[1][0]}
                </Avatar>
                <Typography sx={{ mx: "auto" }}>
                    You are talking to a ChatBOT
                </Typography>
                <Typography sx={{ mx: "auto", my: 4, p: 3 }}>
                    You can ask some questions related to Knowledge, Business, Advices,
                    Education, etc. But avoid sharing personal information
                </Typography>
                <Button
                    onClick={handleDeleteChats}
                    sx={{
                        //   width: "200px",
                        my: "auto",
                        color: "white",
                        fontWeight: "700",
                        borderRadius: 3,
                        mx: "auto",
                        bgcolor: red[300],
                        ":hover": {
                            bgcolor: red.A400,
                        },
                    }}
                >
                    Clear Conversation
                </Button>
            </Box>
        </Box>
    );
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "transparent"
                }}
            >
                <Toolbar sx={{
                    // minHeight: "0 !important",
                }}>
                    {/* <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Box
                        sx={{
                            ml: 'auto',
                            display: "flex",
                            gap: 2
                        }}
                    >
                        <ColorModeSelect />

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleogout}

                        >
                            <LogoutRoundedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                {/* <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        borderRight: "none",

                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: 'none',
                        },
                        '.css-1iymu28-MuiPaper-root-MuiDrawer-paper': {
                            borderRight: "none",

                        }
                    }}

                    slotProps={{
                        root: {
                            keepMounted: true, // Better open performance on mobile.
                        },
                    }}
                >
                    {drawer}

                </Drawer> */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Toolbar disableGutters>
                        <IconButton sx={{ p: 0, mr: 1 }}>
                            <Avatar alt="logo" src="images/logo.png" />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 500,
                                //   letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Open Talk GPT
                        </Typography>
                    </Toolbar>
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Box
                    sx={{
                        width: "100%",
                        height: "70vh",
                        borderRadius: 3,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        overflowX: "hidden",
                        overflowY: "auto",
                        scrollBehavior: "smooth",
                    }}
                >
                    {chatMessages?.length > 0 ?
                        (chatMessages?.map((chat, index) => (
                            //@ts-ignore
                            <ChatItem content={chat.content} role={chat.role} key={index} loading={loading} />
                        )))

                        :
                        <Typography
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}>
                            No chat yet..</Typography>
                    }
                </Box>

                <div
                    style={{
                        width: "100%",
                        borderRadius: 8,
                        backgroundColor: "rgb(17,27,39)",
                        display: "flex",
                        padding: "8px",
                    }}
                >
                    <input
                        ref={inputRef}
                        type="text"
                        onKeyDown={handleKeyDown}
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            padding: "12px",
                            border: "none",
                            outline: "none",
                            color: "white",
                            fontSize: "16px",
                        }}
                    />

                    <IconButton onClick={handleSubmit} sx={{ color: "white", mx: 1 }}>
                        <SendRoundedIcon />
                    </IconButton>
                </div>
            </Box>
        </Box>
    );
}
