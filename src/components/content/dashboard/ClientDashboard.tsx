import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "../Header";
import Copyright from "../Copyright";
import {
  Button,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addLocale, locale } from "primereact/api";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import EventAddEditForm from "../forms/NurseEventAddEditForm";
import { getDoctors, UserData } from "../../../api/ApiAccount";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import {
  getVaccinationList,
  VaccinationInformation,
} from "../../../api/ApiVaccination";
import {
  EventInformation,
  getBusyEvents,
  getSelectedEvent,
} from "../../../api/ApiEvent";
import "../../../App.css";
import { DataManager, ODataV4Adaptor, Query } from "@syncfusion/ej2-data";

//Report designer source
import "@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min";
import "@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css";
//Data-Visualization
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min";
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min";
//Reports react base
import "@boldreports/react-reporting-components/Scripts/bold.reports.react.min";
import {
  Agenda,
  Day,
  EventSettingsModel,
  Inject,
  Month,
  PopupOpenEventArgs,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import PatientEventAddEditForm from "../forms/PatientEventAddEditForm";
import { EventMappedInformation } from "./NurseDashboard";

declare let BoldReportViewerComponent: any;

var viewerStyle = {
  height: "700px",
  width: "100%",
};

export default function ClientDashboardContent() {
  const [openAddEditEventDialog, setOpenAddEditEventDialog] = useState(false);
  const [openAddEditEventDialogUndefined, setOpenAddEditEventDialogUndefined] =
    useState(false);
  const [mappedEvents, setMappedEvents] = useState<EventMappedInformation[]>(
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<EventInformation>();
  const [newEventStart, setNewEventStart] = useState<string>("");
  const [doctorsList, setDoctorsList] = useState<UserData[]>([]);
  const [doctorEventList, setDoctorEventList] = useState<EventInformation[]>(
    []
  );
  const [selectedDoctor, setSelectedDoctor] = useState<UserData>();
  const [vaccinationList, setVaccinationList] = useState<
    VaccinationInformation[]
  >([]);
  const [eventList, setEventList] = useState<EventInformation[]>([]);

  let navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCloseAddEditEventDialog = () => {
    setOpenAddEditEventDialog(false);
  };

  useEffect(() => {
    getBusyEvents(Number(localStorage.getItem("accId")))
      .then((res) => {
        setEventList(res.data);
        handleRefreshSchedule(16);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          enqueueSnackbar(error.response.data.message, {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      });
    getDoctors()
      .then((res) => {
        setDoctorsList(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          enqueueSnackbar(error.response.data.message, {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      });
    getVaccinationList()
      .then((res) => {
        setVaccinationList(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.clear();
          navigate("/login");
        } else {
          enqueueSnackbar(error.response.data.message, {
            anchorOrigin: { vertical: "top", horizontal: "right" },
            variant: "error",
            autoHideDuration: 5000,
          });
        }
      });
  }, []);

  function onPopupOpen(args: PopupOpenEventArgs): void {
    if(selectedDoctor === undefined || (args.data?.Id > 0 )){
      args.cancel = true;
      return;
    }
    setNewEventStart(args.data?.startTime);
    if (args.data?.Id !== undefined) {
      getSelectedEvent(args.data?.Id)
        .then((res) => {
          setSelectedEvent(res?.data);
          setOpenAddEditEventDialog(true);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.clear();
            navigate("/login");
          } else {
            enqueueSnackbar(error.response.data.message, {
              anchorOrigin: { vertical: "top", horizontal: "right" },
              preventDuplicate: true,
              variant: "error",
              autoHideDuration: 5000,
              onClick: () => {
                closeSnackbar();
              },
            });
          }
        });
    } else {
      setSelectedEvent(undefined);
      setOpenAddEditEventDialog(true);
      setOpenAddEditEventDialogUndefined(true);
    }

    args.cancel = true;
  }
  function onEventRendered(args: any) {
    let categoryColor = args.data.Color;
    args.element.style.backgroundColor = categoryColor;
  }
  const eventSettings: EventSettingsModel = { dataSource: mappedEvents };

  function handleRefreshSchedule(doctorId: Number): void {
    const mappedEventsTemp = eventList
      .filter((ev) => ev.doctorId === doctorId)
      .map((event) => ({
        Id: event.id,
        StartTime: new Date(event.timeFrom),
        EndTime: new Date(event.timeTo),
        Subject: event.description,
        Color: event.accId === Number(localStorage.getItem("accId")) ? "#00b33c" : "#4d4dff",
      }));
    setMappedEvents(mappedEventsTemp);
  }

  addLocale("pl", {
    firstDayOfWeek: 1,
    dayNames: [
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
      "niedziela",
    ],
    dayNamesShort: ["pon", "wt", "śr", "czw", "pt", "sob", "nd"],
    dayNamesMin: ["P", "W", "S", "C", "Pt", "S", "N"],
    monthNames: [
      "styczeń",
      "luty",
      "marzec",
      "kwiecień",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzesień",
      "październik",
      "listopad",
      "grudzień",
    ],
    monthNamesShort: [
      "sty",
      "lut",
      "mar",
      "kwi",
      "maj",
      "cze",
      "lip",
      "sie",
      "wrz",
      "paz",
      "lis",
      "gru",
    ],
    today: "Dziś",
    clear: "Wyczyść",
  });
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year + 1 : year;
  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);
  locale("pl");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {/* <BoldReportViewerComponent
     id="reportviewer-container"
     reportServiceUrl = {'https://demos.boldreports.com/services/api/ReportViewer'}
     reportPath = {'../../../assets/resources/ZaswiadczenieCOVID.rdl'} >
     </BoldReportViewerComponent> */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              ></Paper>
            </Grid>
            <Grid item xs={12}>
              {doctorsList.length === 0 ? (
                <div>
                  <Skeleton variant="rounded" height={60} />
                </div>
              ) : (
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <TextField
                    label="Doktor"
                    select
                    fullWidth
                    style={{ textAlign: "left" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setSelectedDoctor(
                        doctorsList.filter(
                          (doc) => doc.id === Number(event.target.value)
                        )[0]
                      );
                      setDoctorEventList(
                        eventList.filter(
                          (ev) => ev.doctorId === Number(event.target.value)
                        )
                      );
                      handleRefreshSchedule(Number(event.target.value));
                    }}
                  >
                    {doctorsList.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.firstname + " " + type.lastname}
                      </MenuItem>
                    ))}
                  </TextField>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {eventList == undefined ? (
                  <div>Loading</div>
                ) : (
                  <div>
                    <ScheduleComponent
                      height="60vh"
                      currentView="WorkWeek"
                      selectedDate={new Date()}
                      popupOpen={onPopupOpen}
                      eventRendered={onEventRendered}
                      eventSettings={eventSettings}
                      timeScale={{ enable: true, interval: 15, slotCount: 1 }}
                    >
                      <ViewsDirective>
                        <ViewDirective
                          option="Day"
                          startHour="8:00"
                          endHour="16:00"
                          showWeekend={false}
                        />
                      </ViewsDirective>
                      <Inject services={[Day]} />
                    </ScheduleComponent>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
      <Dialog
        open={
          openAddEditEventDialog &&
          (!!selectedEvent || openAddEditEventDialogUndefined)
        }
        onClose={handleCloseAddEditEventDialog}
      >
        <DialogContent>
          <PatientEventAddEditForm
            onClose={handleCloseAddEditEventDialog}
            doctorsList={doctorsList}
            patientsList={undefined}
            vaccinationsList={vaccinationList.filter((vac) => vac.isActive)}
            eventInformation={selectedEvent}
            newEventStartTime={newEventStart}
            newEventDoctor={selectedDoctor}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
