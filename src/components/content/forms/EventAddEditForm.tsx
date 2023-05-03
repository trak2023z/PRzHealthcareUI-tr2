import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  EventInformation,
  cancelEventTerm,
  finishEventTerm,
  getAvailableDays,
  takeEventTerm,
} from "../../../api/ApiEvent";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import PostAddIcon from "@mui/icons-material/PostAdd";
import BlockIcon from "@mui/icons-material/Block";
import { UserData } from "../../../api/ApiAccount";
import { VaccinationInformation } from "../../../api/ApiVaccination";
import { Container, IconButton, MenuItem, Paper, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PrintIcon from "@mui/icons-material/Print";
import InfoIcon from "@mui/icons-material/Info";
import { printCOVIDCertificate } from "../../../api/ApiCertificate";
import { event } from "jquery";

interface EventAddEditFormProps {
  onClose: () => void;
  eventInformation?: EventInformation | undefined;
  doctorsList: UserData[];
  patientsList: UserData[] | undefined;
  vaccinationsList: VaccinationInformation[];
  startDate: Date | undefined;
  startTime: String | undefined;
  isPatient: Boolean;
}

const addEventSchema = yup.object().shape({
  vacId: yup.number().required(),
  doctorId: yup.number().required(),
  timeFrom: yup.string().required(),
  dateFrom: yup.date().required(),
});

const EventAddEditForm: React.FC<EventAddEditFormProps> = ({
  onClose,
  eventInformation,
  doctorsList,
  patientsList,
  vaccinationsList,
  startDate,
  startTime,
  isPatient,
}) => {
  const isEdit = !!eventInformation;

  // console.log(startDate)
  // console.log(startTime)

  const [availableDays, setAvailableDays] = useState<EventInformation[]>([]);
  const [selectedDate, setSelectedDate] = useState<String>();
  const [selectedDoctor, setSelectedDoctor] = useState<String>();
  const [selectedVaccination, setSelectedVaccination] =
    useState<VaccinationInformation>();
  let navigate = useNavigate();
  const theme = createTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  yup.setLocale({
    mixed: {
      required: "Pole obowiązkowe",
    },
  });

  useEffect(() => {}, []);

  const handleDoctorChanged = (data: String) => {
    if (data != null) {
      setSelectedDate(undefined);
      setSelectedDoctor(data);
    }
  };
  const handleVaccinationChanged = (data: String) => {
    if (data != null) {
      setSelectedVaccination(
        vaccinationsList.filter((vac) => vac.id == Number(data))[0]
      );
    }
  };
  const handleFinishTerm = (data: EventInformation | undefined) => {
    if (data != undefined) {
      finishEventTerm(data)
        .then((res) => {
          enqueueSnackbar("Wizyta została zakończona", {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            preventDuplicate: true,
            variant: "error",
            autoHideDuration: 5000,
            onClick: () => {
              closeSnackbar();
            },
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            navigate("/login");
          }
          enqueueSnackbar(error.response.data.message, {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            preventDuplicate: true,
            variant: "error",
            autoHideDuration: 5000,
            onClick: () => {
              closeSnackbar();
            },
          });
        });
    }
  };
  const handleCancelTerm = (data: EventInformation | undefined) => {
    if (data != undefined) {
      cancelEventTerm(data)
        .then((res) => {
          enqueueSnackbar("Wizyta została odwołana", {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            preventDuplicate: true,
            variant: "error",
            autoHideDuration: 5000,
            onClick: () => {
              closeSnackbar();
            },
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            navigate("/login");
          }
          enqueueSnackbar(error.response.data.message, {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            preventDuplicate: true,
            variant: "error",
            autoHideDuration: 5000,
            onClick: () => {
              closeSnackbar();
            },
          });
        });
    }
  };
  const handlePrintCertificate = (data: EventInformation | undefined) => {
    printCOVIDCertificate(data)
      .then((res) => {
        //if(data != undefined){
        console.log(res.data);
        const date = new Date();
        const url: string = window.URL.createObjectURL(new Blob([res.data]));
        const a: HTMLAnchorElement = document.createElement("a");
        a.href = url;
        a.download =
          String(1234) +
          date.getFullYear() +
          date.getMonth() +
          date.getDay() +
          ".pdf";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        });
        //  }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
        enqueueSnackbar(error.response.data.message, {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          preventDuplicate: true,
          variant: "error",
          autoHideDuration: 5000,
          onClick: () => {
            closeSnackbar();
          },
        });
      });
  };

  const handleDateChanged = (data: String) => {
    if (data != null) {
      setSelectedDate(data);
      if (selectedDoctor != null && data != null) {
        getAvailableDays(data, selectedDoctor)
          .then((res) => {
            console.log(res.data);
            setAvailableDays(res.data);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              localStorage.clear();
              navigate("/login");
            }
            enqueueSnackbar(error.response.data.message, {
              anchorOrigin: { vertical: "top", horizontal: "right" },
              preventDuplicate: true,
              variant: "error",
              autoHideDuration: 5000,
              onClick: () => {
                closeSnackbar();
              },
            });
          });
      }
    }
  };

  const padTo2Digits = (num: string) => {
    return String(num).padStart(2, "0");
  };
  const getFormattedTime = (data: Date) => {
    return (
      padTo2Digits(data.getHours().toString()) +
      ":" +
      padTo2Digits(data.getMinutes().toString())
    );
  };

  const submitHandler: SubmitHandler<EventInformation> = (
    data: EventInformation
  ) => {
    takeEventTerm(data)
      .then((res: any) => {
        enqueueSnackbar(
          isPatient
            ? "Wizyta została zarejestrowana. Informacja została wysłana na Twoją skrzynkę pocztową!"
            : "Wizyta została zarejestrowana. Informacja została wysłana na skrzynkę pocztową pacjenta!",
          {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            variant: "success",
            autoHideDuration: 8000,
            onClick: () => {
              closeSnackbar();
            },
          }
        );
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
  } = useForm<EventInformation>({ resolver: yupResolver(addEventSchema) });
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(submitHandler)}>
        <br />
        <Stack spacing={2} direction={"column"}>
          {!isPatient && (
            <Controller
              name="accId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Pacjent"
                  {...field}
                  fullWidth
                  error={!!errors.accId}
                  helperText={errors.accId ? errors.accId?.message : ""}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);
                    handleDoctorChanged(event.target.value);
                  }}
                >
                  {patientsList?.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.firstname + " " + type.lastname}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}
          <Stack direction={"row"}>
            <Controller
              name="vacId"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Szczepionka"
                  {...field}
                  fullWidth
                  error={!!errors.vacId}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);
                    handleVaccinationChanged(event.target.value);
                  }}
                  helperText={errors.vacId ? errors.vacId?.message : ""}
                >
                  {vaccinationsList.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Tooltip
              title={selectedVaccination?.description}
              sx={{ fontSize: "13" }}
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Controller
            name="doctorId"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Doktor"
                {...field}
                fullWidth
                error={!!errors.doctorId}
                helperText={errors.doctorId ? errors.doctorId?.message : ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event);
                  handleDoctorChanged(event.target.value);
                }}
              >
                {doctorsList.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.firstname + " " + type.lastname}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="dateFrom"
            control={control}
            render={({ field }) => (
              <TextField
                id="date"
                type="date"
                label="Data"
                defaultValue={
                  startDate ? getFormattedTime(startDate) : Date.now.toString()
                }
                InputLabelProps={{
                  shrink: true,
                }}
                {...field}
                fullWidth
                error={!!errors.dateFrom}
                helperText={errors.dateFrom ? errors.dateFrom?.message : ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(event);
                  handleDateChanged(event.target.value);
                }}
              ></TextField>
            )}
          />
          <Controller
            name="timeFrom"
            control={control}
            render={({ field }) => (
              <TextField
                select
                label="Wybierz termin"
                defaultValue={startTime ? startTime : ""}
                maxRows={5}
                {...field}
                fullWidth
                error={!!errors.timeFrom}
                helperText={errors.timeFrom ? errors.timeFrom?.message : ""}
              >
                {availableDays.map((type) => (
                  <MenuItem key={type.timeFrom} value={type.timeFrom}>
                    {getFormattedTime(new Date(type.timeFrom))}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dodatkowe uwagi"
                multiline
                fullWidth
                variant="outlined"
                error={!!errors.description}
              />
            )}
          />
          {!isEdit && (
            <Stack direction={"column"} spacing={2}>
              <Button
                onClick={() => {
                  handleFinishTerm(eventInformation);
                }}
                variant="contained"
                color="info"
                disabled={eventInformation == undefined}
                endIcon={<CheckCircleOutlineIcon />}
              >
                Zatwierdź wizytę
              </Button>
              <Button
                onClick={() => {
                  handleCancelTerm(eventInformation);
                }}
                variant="contained"
                color="warning"
                disabled={eventInformation == undefined}
                endIcon={<BlockIcon />}
              >
                Anuluj wizytę
              </Button>
              <Button
                onClick={() => {
                  handlePrintCertificate(eventInformation);
                }}
                variant="contained"
                color="secondary"
                disabled={eventInformation == undefined}
                endIcon={<PrintIcon />}
              >
                Wydrukuj zaświadczenie
              </Button>
            </Stack>
          )}
          <Stack
            direction="row"
            spacing={5}
            my={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              endIcon={
                isEdit ? (
                  <>
                    {" "}
                    <SaveAsIcon />
                  </>
                ) : (
                  <>
                    <PostAddIcon />
                  </>
                )
              }
            >
              {isEdit ? "Zatwierdź zmiany" : "Zapisz wizytę"}
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
        <br />
      </form>
    </Container>
  );
};

export default EventAddEditForm;
