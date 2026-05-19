import {
  Box,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

export default function ChatInput() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: {
          xs: 10,
          sm: 20,
        },

        width: "80%",
        // display: "flex",
        // justifyContent: "center",
        // px: {
        //   xs: 1.5,
        //   sm: 3,
        // },
        zIndex: 1300,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "700px",
            md: "850px",
            lg: "950px",
          },

          minHeight: "64px",

          borderRadius: "24px",

          px: {
            xs: 1,
            sm: 2,
          },

          py: {
            xs: 0.7,
            sm: 1,
          },

          display: "flex",
          alignItems: "flex-end",
          gap: 1,

          bgcolor: "#202123",

          border: "1px solid #3a3a3a",
        }}
      >
        {/* Attach */}
        <IconButton
          sx={{
            color: "#b4b4b4",
            mb: "2px",
          }}
        >
          <AttachFileRoundedIcon />
        </IconButton>

        {/* Textbox */}
        <TextField
          fullWidth
          multiline
          maxRows={6}
          placeholder="Ask anything..."
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
            },

            "& .MuiInputBase-input": {
              fontSize: {
                xs: "14px",
                sm: "15px",
                md: "16px",
              },

              lineHeight: 1.5,
              py: 1,
            },
          }}
        />

        {/* Send */}
        <IconButton
          sx={{
            bgcolor: "white",
            color: "black",

            width: {
              xs: 36,
              sm: 42,
            },

            height: {
              xs: 36,
              sm: 42,
            },

            "&:hover": {
              bgcolor: "#e5e5e5",
            },
          }}
        >
          <SendRoundedIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}