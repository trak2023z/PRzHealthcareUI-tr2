import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    let navigate = useNavigate();

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
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6">
                            Strona, której szukasz nie istnieje lub jest niedostępna.
                        </Typography>
                        <Button variant="contained" onClick={() => { navigate('/') }}>Strona główna</Button>
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