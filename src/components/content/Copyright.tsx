import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/mateusz-kubis" target="_blank" rel="noreferrer">
                Mateusz Kubis 165083
            </Link>{' | '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}