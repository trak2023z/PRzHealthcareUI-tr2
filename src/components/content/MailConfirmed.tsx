import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { confirmAccount } from "../../api/ApiAccount";
import { useSnackbar } from "notistack";

export default function MailConfirmed() {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("hashCode");

  useEffect(() => {
    confirmAccount(searchParams.get("hashCode"))
      .then((res) => {})
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "error",
          autoHideDuration: 5000,
        });
      });
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <img src="/welcome.png" alt="" width={600} height={350} />
          </Grid>
          <Grid xs={12}>
            <Typography variant="h6">
              Konto zostało pomyślnie zatwierdzone.
            </Typography>
            <br/>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              Wróć do strony głównej
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
