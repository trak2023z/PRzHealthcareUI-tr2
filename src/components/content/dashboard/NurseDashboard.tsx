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
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addLocale, locale } from "primereact/api";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import EventAddEditForm from "../forms/EventAddEditForm";
import { getDoctors, UserData } from "../../../api/ApiAccount";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import {
  getVaccinationList,
  VaccinationInformation,
} from "../../../api/ApiVaccination";
import { EventInformation, getNurseEvents } from "../../../api/ApiEvent";
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
  Inject,
  Month,
  PopupOpenEventArgs,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";

declare let BoldReportViewerComponent: any;

var viewerStyle = {
  height: "700px",
  width: "100%",
};

export default function NurseDashboardContent() {
  const [openAddEditEventDialog, setOpenAddEditEventDialog] = useState(false);
  const [doctorsList, setDoctorsList] = useState<UserData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<UserData>();
  const [vaccinationList, setVaccinationList] = useState<
    VaccinationInformation[]
  >([]);
  const [eventList, setEventList] = useState<EventInformation[]>([]);
  const [doctorEventList, setDoctorEventList] = useState<EventInformation[]>(
    []
  );
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState<String>();

  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseAddEditEventDialog = () => {
    setOpenAddEditEventDialog(false);
  };

  useEffect(() => {
    getNurseEvents(Number(localStorage.getItem("accId")))
      .then((res) => {
        setEventList(res.data);
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
    const hours = new Date(
      args.data?.startTime ? args.data?.startTime?.toString() : new Date()
    )
      .getHours()
      .toString()
      .padStart(2, "0");
    const minutes = new Date(
      args.data?.startTime ? args.data?.startTime?.toString() : new Date()
    )
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const time = `${hours}:${minutes}`;

    setStartDate(
      new Date(args.data ? args.data.toString() : new Date().getDate())
    );
    setStartTime(time);
    args.cancel = true;
    setOpenAddEditEventDialog(true);
  }
  function onExportProgressChanged(event: any) {
    if (event.stage === "beginExport") {
        console.log(event.stage);
    }
    else if (event.stage === "exportStarted") {
        console.log(event.stage);
    }
    else if (event.stage === "preparation") {
        console.log(event.stage);
        console.log(event.format);
        console.log(event.preparationStage);
    }
    event.handled = true;
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

  var parameters = [
    {
      name: "EventId",
      values: [7195],
      labels: ["7195"],
      nullable: false,
      dateTimeInfo: {},
    },
  ];
  var parameterSettings = {
    hideParameterBlock: true,
  };

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
        <BoldReportViewerComponent
          id="reportviewer-container"
          reportServiceUrl={
            "http://192.168.56.1:5000/api/ReportViewer"}
          reportPath={"ZaswiadczenieCOVID"}
          parameterSettings={parameterSettings}
          parameters={parameters}
          exportProgressChanged = {onExportProgressChanged}
        ></BoldReportViewerComponent>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, display: "flex", flexDirection: "column" }}
              ></Paper>
            </Grid>
            <Grid item xs={12}>
              {doctorsList.length === 0 ? (
                <div>Loading...</div>
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
            <Grid item xs={12} md={5} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "6vh",
                }}
              >
                <Typography align="center">Wizyty</Typography>
              </Paper>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <List disablePadding>
                  {eventList
                    .filter((ev) => ev.doctorId === selectedDoctor?.id)
                    .map((event) => (
                      <ListItem disablePadding key={event.id}>
                        <ListItemText>* {event.timeFrom}</ListItemText>
                      </ListItem>
                    ))}
                </List>
                <br />
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenAddEditEventDialog(true);
                  }}
                >
                  Zaplanuj wizytę
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {eventList === undefined ? (
                  <div>Loading</div>
                ) : (
                  <div>
                    <ScheduleComponent
                      height="550px"
                      selectedDate={new Date()}
                      popupOpen={onPopupOpen}
                      timeScale={{ enable: true, interval: 15, slotCount: 1 }}
                    >
                      <ViewsDirective>
                        <ViewDirective
                          option="WorkWeek"
                          startHour="8:00"
                          endHour="16:00"
                        />
                        <ViewDirective option="Day" showWeekend={false} />
                      </ViewsDirective>
                      <Inject services={[Day, WorkWeek, Month, Agenda]} />
                    </ScheduleComponent>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
      {startDate === null || startDate === undefined ? (
        <div>Loading</div>
      ) : (
        <Dialog
          open={openAddEditEventDialog}
          onClose={handleCloseAddEditEventDialog}
        >
          <DialogContent>
            <EventAddEditForm
              onClose={handleCloseAddEditEventDialog}
              doctorsList={doctorsList}
              vaccinationsList={vaccinationList}
              startDate={startDate ? startDate : undefined}
              startTime={startTime ? startTime : undefined}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
