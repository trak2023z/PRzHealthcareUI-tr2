import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Header from "../Header";
import { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import NurseDashboardContent from "./NurseDashboard";
import ClientDashboardContent from "./ClientDashboard";

export default function Dashboard() {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>();

  useEffect(() => {
    if(localStorage.getItem("atyId")==="2" || localStorage.getItem("atyId")==="3" || localStorage.getItem("atyId")==="4")
    {
      setIsAdmin(true)
    }
    else{
      setIsAdmin(false);
    }
    
  }, []);

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
        {isAdmin? (<Outlet />) : (<ClientDashboardContent/>)}
        {/*  */}
      </Box>
    </Box>
  );
}
