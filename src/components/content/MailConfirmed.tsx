import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { confirmAccount } from '../../api/ApiAccount';
import { useSnackbar } from 'notistack';

export default function MailConfirmed() {
    let navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        confirmAccount().then((res) => {
        })
          .catch((error) => {
            enqueueSnackbar(error.response.data.message, {
              anchorOrigin: { vertical: "top", horizontal: "right" },
              variant: "error",
              autoHideDuration: 5000
            });
          });
      }
    );

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <Typography variant="h6">
                            Konto zostało pomyślnie zatwierdzone.
                        </Typography>
                        <Button variant="contained" onClick={() => { navigate('/') }}>Wróć do strony głównej</Button>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                            alt=""
                            width={500} height={250}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}