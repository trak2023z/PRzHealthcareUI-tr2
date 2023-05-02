import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { registerAccount, RegisterData } from "../../../api/ApiAccount";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, Box, Container, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import PasswordStrengthBar from "react-password-strength-bar";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  let navigate = useNavigate();

  yup.setLocale({
    mixed: {
      default: "Nieprawidłowa wartość",
      required: "Pole obowiązkowe",
    },
    string: {
      email: "Nieprawidłowy adres e-mail",
      min: "Hasło musi zawierać minimum ${min} znaków",
    },
  });

  const signUpSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required().min(8),
    firstname: yup.string().required(),
    secondname: yup.string().nullable(),
    // photoBinary: yup.string().nullable(),
    lastname: yup.string().required(),
    dateOfBirth: yup.date().required(),
    pesel: yup.number().typeError("Wartość musi być liczbowa").required(),
    email: yup.string().email().required(),
    contactNumber: yup.string().required(),
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler: SubmitHandler<RegisterData> = (data: RegisterData) => {
    console.log(data);
    registerAccount(data)
      .then(() => {
        enqueueSnackbar(
          "Konto zostało utworzone. Sprawdź skrzynkę pocztową celem potwierdzenia.",
          {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            variant: "success",
            preventDuplicate: true,
            autoHideDuration: 6000,
            onClick: () => {
              closeSnackbar();
              navigate("/login");
            },
          }
        );
      })
      .catch((error) => {
        enqueueSnackbar(error.response.data.message, {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 5000,
          onClick: () => {
            closeSnackbar();
          },
        });
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: yupResolver(signUpSchema) });

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ background: "#f1f2f3" }}>
        <form onSubmit={handleSubmit(submitHandler)} className="form">
          <Stack spacing={2} m={3}>
            <Link to="/">
              <img src="/prz_logo.png" width={225} alt="logo" />
            </Link>
            <Typography component="h1" variant="h5">
              Rejestracja
            </Typography>

            <Controller
              name="login"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Login"
                  required
                  variant="outlined"
                  error={!!errors.login}
                  helperText={errors.login ? errors.login?.message : ""}
                  sx={{ background: "white" }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextField
                    {...field}
                    type="password"
                    required
                    label="Hasło"
                    variant="outlined"
                    error={!!errors.password}
                    fullWidth
                    helperText={errors.password ? errors.password?.message : ""}
                    sx={{ background: "white" }}
                  />
                  <PasswordStrengthBar
                    password={field.value}
                    scoreWords={[
                      "słabe",
                      "słabe",
                      "średnie",
                      "mocne",
                      "bardzo mocne",
                    ]}
                    shortScoreWord={"za krótkie"}
                    minLength={8}
                  />
                </Box>
              )}
            />
            <Stack
              direction={"row"}
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Imię"
                    required
                    fullWidth
                    variant="outlined"
                    error={!!errors.firstname}
                    helperText={
                      errors.firstname ? errors.firstname?.message : ""
                    }
                    sx={{ background: "white" }}
                  />
                )}
              />
              <Controller
                name="secondname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Drugie imię"
                    variant="outlined"
                    fullWidth
                    error={!!errors.secondname}
                    helperText={
                      errors.secondname ? errors.secondname?.message : ""
                    }
                    sx={{ background: "white" }}
                  />
                )}
              />
            </Stack>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nazwisko"
                  required
                  variant="outlined"
                  error={!!errors.lastname}
                  helperText={errors.lastname ? errors.lastname?.message : ""}
                  sx={{ background: "white" }}
                />
              )}
            />
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { ...field } }) => (
                <DatePicker
                  {...field}
                  openTo="year"
                  views={["year", "month", "day"]}
                  label="Data urodzenia"
                  renderInput={(inputProps) => (
                    <TextField
                      {...inputProps}
                      required
                      error={!!errors.dateOfBirth}
                      helperText={
                        errors.dateOfBirth ? errors.dateOfBirth?.message : ""
                      }
                      sx={{ background: "white" }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="pesel"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Pesel *"
                  variant="outlined"
                  error={!!errors.pesel}
                  helperText={errors.pesel ? errors.pesel?.message : ""}
                  sx={{ background: "white" }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="E-mail"
                  required
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ""}
                  sx={{ background: "white" }}
                />
              )}
            />
            <Controller
              name="contactNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Telefon"
                  required
                  variant="outlined"
                  error={!!errors.contactNumber}
                  helperText={
                    errors.contactNumber ? errors.contactNumber?.message : ""
                  }
                  sx={{ background: "white" }}
                />
              )}
            />
            <Stack direction="row" spacing={3}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                endIcon={<PersonAddIcon />}
              >
                Zarejestruj się!
              </Button>
            </Stack>
            <Button variant="contained" color="secondary">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                {"Masz już konto? Zaloguj się!"}
              </Link>
            </Button>
            <br />
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpForm;
