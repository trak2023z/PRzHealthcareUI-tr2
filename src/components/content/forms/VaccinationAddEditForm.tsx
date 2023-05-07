import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  VaccinationInformation,
  addVaccination,
  editVaccination,
} from "../../../api/ApiVaccination";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import BlockIcon from "@mui/icons-material/Block";
import { Checkbox, FormControlLabel } from "@mui/material";

interface VaccinationAddEditFormProps {
  onClose: () => void;
  isEdit: Boolean;
  vaccinationInformation: VaccinationInformation | undefined;
}

const VaccinationAddEditForm: React.FC<VaccinationAddEditFormProps> = ({
  onClose,
  vaccinationInformation,
  isEdit,
}) => {
  let navigate = useNavigate();
  const vaccinationAddEditSchema = yup.object().shape({
    name: yup.string().required("Pole obowiązkowe"),
    description: yup.string().required("Pole obowiązkowe"),
    daysBetweenVacs: yup.number().typeError("Wartość musi być liczbowa"),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler: SubmitHandler<VaccinationInformation> = (
    data: VaccinationInformation
  ) => {
    {
      isEdit
        ? editVaccination(data)
            .then(() => {
              enqueueSnackbar("Zmiany zostały wprowadzone.", {
                anchorOrigin: { vertical: "top", horizontal: "right" },
                variant: "info",
                autoHideDuration: 5000,
                preventDuplicate: true,
                onClick: () => closeSnackbar(),
              });
            })
            .catch((error: any) => {
              if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
              }
              enqueueSnackbar(error.response.data.message, {
                anchorOrigin: { vertical: "top", horizontal: "right" },
                variant: "error",
                preventDuplicate: true,
                autoHideDuration: 5000,
                onClick: () => closeSnackbar(),
              });
            })
        : addVaccination(data)
            .then(() => {
              enqueueSnackbar("Szczepionka została dodana.", {
                anchorOrigin: { vertical: "top", horizontal: "right" },
                variant: "info",
                preventDuplicate: true,
                autoHideDuration: 5000,
                onClick: () => closeSnackbar(),
              });
            })
            .catch((error: any) => {
              if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login");
              }
              enqueueSnackbar(error.response.data.message, {
                anchorOrigin: { vertical: "top", horizontal: "right" },
                variant: "error",
                autoHideDuration: 5000,
                preventDuplicate: true,
                onClick: () => closeSnackbar(),
              });
            });
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VaccinationInformation>({
    resolver: yupResolver(vaccinationAddEditSchema),
    defaultValues: vaccinationInformation,
  });
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="form">
      <br />
      {!isEdit && !!vaccinationInformation ? (
        <div>Loading...</div>
      ) : (
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nazwa"
                  variant="outlined"
                  fullWidth
                  size="small"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name?.message : ""}
                />
              )}
            />
            <Controller
              name="daysBetweenVacs"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  sx={{ minWidth: "25vh" }}
                  label="Dni pomiędzy szczepieniami"
                  variant="outlined"
                  size="small"
                  error={!!errors.daysBetweenVacs}
                  helperText={
                    errors.daysBetweenVacs
                      ? errors.daysBetweenVacs?.message
                      : ""
                  }
                />
              )}
            />
          </Stack>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Opis"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                size="small"
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description?.message : ""
                }
              />
            )}
          />
          <Stack direction="row" spacing={3} padding={1}>
            {!isEdit ? (
              <Button
                type="submit"
                variant="contained"
                color="success"
                endIcon={<AddIcon />}
              >
                Dodaj
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="success"
                endIcon={<SaveIcon />}
              >
                Zapisz zmiany
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="contained"
              color="error"
              endIcon={<BlockIcon />}
            >
              Zamknij
            </Button>
          </Stack>
        </Stack>
      )}
    </form>
  );
};

export default VaccinationAddEditForm;
