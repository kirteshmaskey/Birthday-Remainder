import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircluarLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.6rem",
      }}
    >
      Loading... &nbsp;
      <CircularProgress />
    </Box>
  );
};

export default CircluarLoading;
