import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LoginData } from "../../api/ApiAccount";
import ChangePasswordForm from "../content/forms/ChangePasswordForm";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import {
  VaccinationInformation,
  archiveVaccination,
  getVaccinationList,
  unarchiveVaccination,
} from "../../api/ApiVaccination";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import VaccinationAddEditForm from "./forms/VaccinationAddEditForm";
// import { FileUpload } from './content/FileUpload';

function GlobalSettings() {
  let navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [vaccinationList, setVaccinationList] = useState<
    VaccinationInformation[]
  >([]);
  const [selectedVaccination, setSelectedVaccination] =
    useState<VaccinationInformation>();
  const [openVaccinationsTable, setOpenVaccinationsTable] = useState(false);
  const [openAddEditVaccinationDialog, setOpenAddEditVaccinationDialog] =
    useState(false);
  const [isVaccinationEdit, setIsVaccinationEdit] = useState(false);

  useEffect(() => {
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
            autoHideDuration: 6000,
            onClick: () => {
              closeSnackbar();
            },
          });
        }
      });
  }, []);

  function handleSelectedVaccination(id: any) {
    setSelectedVaccination(
      vaccinationList.filter((vac) => vac.id == Number(id))[0]
    );
    setIsVaccinationEdit(true);
    setOpenAddEditVaccinationDialog(true);
  }
  function handleArchiveVaccination(id: any) {
    archiveVaccination(vaccinationList.filter((vac) => vac.id == Number(id))[0])
      .then((res) => {
        enqueueSnackbar("Szczepionka zarchiwizowana", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          preventDuplicate: true,
          variant: "success",
          autoHideDuration: 6000,
          onClick: () => {
            closeSnackbar();
          },
        });
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
            autoHideDuration: 6000,
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
            autoHideDuration: 6000,
            onClick: () => {
              closeSnackbar();
            },
          });
        }
      });
  }
  function handleUnarchiveVaccination(id: any) {
    unarchiveVaccination(vaccinationList.filter((vac) => vac.id == Number(id))[0])
      .then((res) => {
        enqueueSnackbar("Szczepionka aktywna", {
          anchorOrigin: { vertical: "top", horizontal: "right" },
          preventDuplicate: true,
          variant: "success",
          autoHideDuration: 6000,
          onClick: () => {
            closeSnackbar();
          },
        });
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
            autoHideDuration: 6000,
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
            autoHideDuration: 6000,
            onClick: () => {
              closeSnackbar();
            },
          });
        }
      });
  }

  const handleCloseAddEditVaccinationDialog = () => {
    setIsVaccinationEdit(false);
    setOpenAddEditVaccinationDialog(false);
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
            autoHideDuration: 6000,
            onClick: () => {
              closeSnackbar();
            },
          });
        }
      });
  };

  return (
    <Grid
      container
      spacing={2}
      marginTop={10}
      padding={2}
      style={{ textAlign: "left" }}
    >
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "center" }}>
                  Szczepionki
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() =>
                      setOpenVaccinationsTable(!openVaccinationsTable)
                    }
                  >
                    {openVaccinationsTable ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse
                    in={openVaccinationsTable}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Nazwa</TableCell>
                          <TableCell align="left">Opis</TableCell>
                          <TableCell align="center">
                            Dni pomiędzy szczepieniami
                          </TableCell>
                          <TableCell align="center">Akcja</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {vaccinationList.map((vac) => (
                          <TableRow
                            key={vac.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {vac.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {vac.description}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {vac.daysBetweenVacs}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              <Stack direction={"row"}>
                                {vac.isActive ? (
                                  <Tooltip title="Archiwizuj">
                                    <IconButton color="warning" onClick={() => {handleArchiveVaccination(vac.id)}}>
                                      <ArchiveIcon />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="Aktywuj">
                                    <IconButton color="success"onClick={() => {handleUnarchiveVaccination(vac.id)}}>
                                      <UnarchiveIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}

                                <Tooltip title="Edytuj">
                                  <IconButton
                                    onClick={() => {
                                      handleSelectedVaccination(vac.id);
                                    }}
                                  >
                                    <EditIcon color="info" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <TableFooter>
                        <Stack padding={2}>
                          <Button
                            variant="contained"
                            color="success"
                            endIcon={<AddIcon />}
                            sx={{ maxWidth: "30vh", maxHeight: "6vh" }}
                            onClick={() => {
                              setIsVaccinationEdit(false);
                              setSelectedVaccination(undefined);
                              setOpenAddEditVaccinationDialog(true);
                            }}
                          >
                            Dodaj szczepionkę
                          </Button>
                        </Stack>
                      </TableFooter>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Dialog
        open={openAddEditVaccinationDialog}
        onClose={handleCloseAddEditVaccinationDialog}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogContent>
          <VaccinationAddEditForm
            onClose={handleCloseAddEditVaccinationDialog}
            vaccinationInformation={selectedVaccination}
            isEdit={isVaccinationEdit}
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default GlobalSettings;
