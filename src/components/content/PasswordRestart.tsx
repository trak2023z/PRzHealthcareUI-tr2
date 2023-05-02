import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResetPasswordData, confirmAccount, resetPasswordCheckHashCode } from "../../api/ApiAccount";
import { useSnackbar } from "notistack";
import PasswordRestartForm from "./forms/PasswordRestartForm";

export default function PasswordRestart() {
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("hashCode");

  useEffect(() => {
    resetPasswordCheckHashCode(searchParams.get("hashCode"))
      .then((res) => {})
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "error",
          autoHideDuration: 5000,
        });
      });
  });

  return (<Grid container spacing={2} style={{textAlign:'left'}}>
  <Grid item xs={12} marginLeft={5} marginTop={8}>
      <Typography><h2>Aktualizacja hasła</h2></Typography>
      <hr />
      <PasswordRestartForm hashCode={searchParams.get("hashCode")}/>
  </Grid>
</Grid>);
}
