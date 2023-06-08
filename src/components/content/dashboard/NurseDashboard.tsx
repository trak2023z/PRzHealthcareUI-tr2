import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Header from "../Header";
import Copyright from "../Copyright";
import {
  Dialog,
  DialogContent,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { addLocale, locale } from "primereact/api";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { getDoctors, getPatients, UserData } from "../../../api/ApiAccount";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import {
  getVaccinationList,
  VaccinationInformation,
} from "../../../api/ApiVaccination";
import {
  EventInformation,
  getNurseEvents,
  getSelectedEvent,
} from "../../../api/ApiEvent";
import "../../../App.css";

import "@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min";
import "@boldreports/javascript-reporting-controls/Content/material/bold.reports.all.min.css";
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min";
import "@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min";
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
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import NurseEventAddEditForm from "../forms/NurseEventAddEditForm";
import { Ajax, L10n, setCulture, loadCldr } from "@syncfusion/ej2-base";

loadCldr(
  require("cldr-data/supplemental/numberingSystems.json"),
  require("cldr-data/main/pl/ca-gregorian.json"),
  require("cldr-data/main/pl/numbers.json"),
  require("cldr-data/main/pl/timeZoneNames.json")
);

L10n.load({
  pl: {
    schedule: {
      day: "Dzień",
      week: "Tydzień",
      workWeek: "Tydzień pracy",
      month: "Miesiąc",
      year: "Rok",
      agenda: "Program",
      weekAgenda: "Program tygodniowy",
      workWeekAgenda: "Agenda Tygodnia Pracy",
      monthAgenda: "Agenda miesiąca",
      today: "Dzisiaj",
      noEvents: "Brak wydarzeń",
      emptyContainer: "Na ten dzień nie zaplanowano żadnych wydarzeń.",
      allDay: "Cały dzień",
      start: "Początek",
      end: "Koniec",
      more: "więcej",
      close: "Blisko",
      cancel: "Anuluj",
      noTitle: "(Bez tytułu)",
      delete: "Usuń",
      deleteEvent: "Usuń wydarzenie",
      deleteMultipleEvent: "Usuń wiele wydarzeń",
      selectedItems: "Wybrane elementy",
      deleteSeries: "Cała seria",
      edit: "Edytować",
      editSeries: "Cała seria",
      editEvent: "Wydarzenie",
      createEvent: "Stwórz",
      subject: "Przedmiot",
      addTitle: "Dodaj tytuł",
      moreDetails: "Więcej szczegółów",
      save: "Zapisz",
      editContent: "Jak chciałbyś zmienić spotkanie w serialu?",
      deleteContent: "Czy na pewno chcesz usunąć to wydarzenie?",
      deleteMultipleContent: "Czy na pewno chcesz usunąć wybrane wydarzenia?",
      newEvent: "Wyjazd",
      title: "Tytuł",
      location: "Lokalizacja",
      description: "Opis",
      timezone: "Strefa czasowa",
      startTimezone: "Uruchom strefę czasową",
      endTimezone: "Koniec strefy czasowej",
      repeat: "Powtarzać",
      saveButton: "Zapisz",
      cancelButton: "Anuluj",
      deleteButton: "Usuń",
      recurrence: "Nawrót",
      wrongPattern: "Wzorzec powtarzania się jest nieprawidłowy.",
      seriesChangeAlert:
        "Czy chcesz anulować zmiany wprowadzone w określonych wystąpieniach tej serii i ponownie dopasować ją do całej serii?",
      createError:
        "Czas trwania wydarzenia musi być krótszy niż częstotliwość jego występowania. Skróć czas trwania lub zmień wzorzec cyklu w edytorze zdarzeń cyklicznych.",
      sameDayAlert:
        "Dwa wystąpienia tego samego zdarzenia nie mogą wystąpić tego samego dnia.",
      occurenceAlert:
        "Nie można przełożyć wystąpienia spotkania cyklicznego, jeśli pomija późniejsze wystąpienie tego samego spotkania.",
      editRecurrence: "Edytuj cykl",
      repeats: "Powtarza się",
      alert: "Alarm",
      startEndError: "Wybrana data końcowa występuje przed datą początkową.",
      invalidDateError: "Wprowadzona wartość daty jest nieprawidłowa.",
      blockAlert:
        "Zdarzenia nie mogą być zaplanowane w zablokowanym przedziale czasowym.",
      ok: "Dobrze",
      yes: "tak",
      no: "Nie",
      occurrence: "Występowanie",
      series: "Seria",
      previous: "Poprzedni",
      next: "Kolejny",
      timelineDay: "Dzień na osi czasu",
      timelineWeek: "Tydzień na osi czasu",
      timelineWorkWeek: "Tydzień roboczy osi czasu",
      timelineMonth: "Miesiąc osi czasu",
      timelineYear: "Rok na osi czasu",
      editFollowingEvent: "Następujące wydarzenia",
      deleteTitle: "Usuń wydarzenie",
      editTitle: "Edytuj wydarzenie",
      beginFrom: "Zacząć od",
      endAt: "Koniec o",
      expandAllDaySection: "Rozwiń sekcję całodniową",
      collapseAllDaySection: "Zwiń sekcję całodniową",
      searchTimezone: "Wyszukaj strefę czasową",
      noRecords: "Nic nie znaleziono",
    },
  },
});

export type EventMappedInformation = {
  Id: number;
  Subject: String;
  StartTime: Date;
  EndTime: Date;
};

export default function NurseDashboardContent() {
  const [openAddEditEventDialog, setOpenAddEditEventDialog] = useState(false);
  const [openAddEditEventDialogUndefined, setOpenAddEditEventDialogUndefined] =
    useState(false);
  const [doctorsList, setDoctorsList] = useState<UserData[]>([]);
  const [patientsList, setPatientsList] = useState<UserData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<UserData>();
  const [vaccinationList, setVaccinationList] = useState<
    VaccinationInformation[]
  >([]);
  const [eventList, setEventList] = useState<EventInformation[]>([]);
  const [doctorEventList, setDoctorEventList] = useState<EventInformation[]>(
    []
  );
  const [selectedEvent, setSelectedEvent] = useState<EventInformation>();
  const [mappedEvents, setMappedEvents] = useState<EventMappedInformation[]>(
    []
  );
  const [newEventStart, setNewEventStart] = useState<string>("");

  let navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleCloseAddEditEventDialog = () => {
    setOpenAddEditEventDialog(false);
    setOpenAddEditEventDialogUndefined(false);
    getNurseEvents(Number(localStorage.getItem("accId")))
      .then((res) => {
        setEventList(res.data);

        if (!!selectedDoctor) {
          handleRefreshSchedule(selectedDoctor.id);
        } else {
          handleRefreshSchedule(16);
        }
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
  };

  const eventSettings: EventSettingsModel = { dataSource: mappedEvents };

  useEffect(() => {
    getNurseEvents(Number(localStorage.getItem("accId")))
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
            preventDuplicate: true,
            variant: "error",
            autoHideDuration: 5000,
            onClick: () => {
              closeSnackbar();
            },
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
            preventDuplicate: true,
            variant: "error",
            autoHideDuration: 5000,
            onClick: () => {
              closeSnackbar();
            },
          });
        }
      });
    getPatients()
      .then((res) => {
        setPatientsList(res.data);
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
            preventDuplicate: true,
            variant: "error",
            autoHideDuration: 5000,
            onClick: () => {
              closeSnackbar();
            },
          });
        }
      });
  }, []);

  function handleRefreshSchedule(doctorId: Number): void {
    const mappedEventsTemp = eventList
      .filter((ev) => ev.doctorId === doctorId)
      .map((event) => ({
        Id: event.id,
        StartTime: new Date(event.timeFrom),
        EndTime: new Date(event.timeTo),
        Subject: event.description,
        IsAllDay: false,
        Color: event.type === 4 ? "#00b33c" : "#4d4dff",
      }));
    setMappedEvents(mappedEventsTemp);
  }

  function onPopupOpen(args: PopupOpenEventArgs): void {
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
                <ScheduleComponent
                  height="60vh"
                  currentView="WorkWeek"
                  locale="pl"
                  selectedDate={new Date()}
                  popupOpen={onPopupOpen}
                  eventRendered={onEventRendered}
                  eventSettings={eventSettings}
                  timeScale={{ enable: true, interval: 15, slotCount: 1 }}
                >
                  <ViewsDirective>
                    <ViewDirective
                      option="WorkWeek"
                      startHour="8:00"
                      endHour="16:00"
                    />
                    <ViewDirective
                      option="Day"
                      showWeekend={false}
                      startHour="8:00"
                      endHour="16:00"
                    />
                    <ViewDirective
                      option="Month"
                      showWeekend={false}
                      startHour="8:00"
                      endHour="16:00"
                    />
                  </ViewsDirective>
                  <Inject services={[Day, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
      <Suspense fallback={<Skeleton height={"50vh"} />}>
        <Dialog
          open={
            openAddEditEventDialog &&
            (!!selectedEvent || openAddEditEventDialogUndefined)
          }
          onClose={handleCloseAddEditEventDialog}
        >
          <DialogContent>
            <NurseEventAddEditForm
              onClose={handleCloseAddEditEventDialog}
              doctorsList={doctorsList}
              patientsList={patientsList}
              vaccinationsList={vaccinationList.filter((vac) => vac.isActive)}
              eventInformation={selectedEvent}
              newEventStartTime={newEventStart}
              newEventDoctor={
                selectedDoctor !== undefined ? selectedDoctor : undefined
              }
              isPatient={false}
            />
          </DialogContent>
        </Dialog>
      </Suspense>
    </Box>
  );
}
