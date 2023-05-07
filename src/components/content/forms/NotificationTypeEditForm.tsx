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
import { Checkbox, FormControlLabel, Skeleton } from "@mui/material";
import {
  NotificationTypeInformation,
  editNotificationType,
} from "../../../api/ApiNotification";

interface NotificationTypeEditFormProps {
  onClose: () => void;
  notificationTypeInformation: NotificationTypeInformation | undefined;
}

const NotificationTypeEditForm: React.FC<NotificationTypeEditFormProps> = ({
  onClose,
  notificationTypeInformation,
}) => {
  let navigate = useNavigate();
  const notificationTypeEditSchema = yup.object().shape({
    template: yup.string().required("Pole obowiązkowe"),
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler: SubmitHandler<NotificationTypeInformation> = (
    data: NotificationTypeInformation
  ) => {
    editNotificationType(data)
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
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NotificationTypeInformation>({
    resolver: yupResolver(notificationTypeEditSchema),
    defaultValues: notificationTypeInformation,
  });
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="form">
      <br />
      {!notificationTypeInformation ? (
        <div><Skeleton height={300}/></div>
      ) : (
        <Stack direction={"column"} spacing={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nazwa"
                variant="outlined"
                fullWidth
                disabled={true}
                size="small"
                error={!!errors.name}
                helperText={
                  errors.name ? errors.name?.message : ""
                }
              />
            )}
          />
          <Controller
            name="template"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Szablon"
                variant="outlined"
                fullWidth
                multiline
                rows={15}
                size="small"
                error={!!errors.template}
                helperText={
                  errors.template ? errors.template?.message : ""
                }
              />
            )}
          />
          <Stack direction="row" spacing={3} padding={1}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              endIcon={<SaveIcon />}
            >
              Zapisz zmiany
            </Button>
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

export default NotificationTypeEditForm;
