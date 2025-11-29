import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import eleccom from '../../assets/images/eleccom.jpg';
import electricidad from '../../assets/images/electricidad.jpg';
import tics from '../../assets/images/tics.jpg';
import mecanica from '../../assets/images/mecanica.jpg'
import logotipo from '../../assets/images/logotipo.png';

import { Box, Button, CardActions, CardContent, CardMedia, colors, Typography } from '@mui/material';

interface ImageCareerItem {
    id: string;
    img: string;
    title: string;
    descripcion: string;
}

const itemData: ImageCareerItem[] = [
    {
        id: '1',
        img: eleccom,
        title: 'Electronica Industrial',
        descripcion: 'Curso en el área de ELECTRONICA INDUSTRIAL con estandares industriales a nivel global.'
    },
    {
        id: '2',
        img: electricidad,
        title: 'Electricidad Industrial',
        descripcion: 'Curso en el área de ELECTRICIDAD INDUSTRIAL con estandares industriales a nivel global.'
    },
    {
        id: '3',
        img: tics,
        title: 'Desarrollo de Software',
        descripcion: 'Curso en el área de DESARROLLO DE SOFTWARE con estandares industriales a nivel global.'

    },
    {
        id: '4',
        img: mecanica,
        title: 'Mecanica Automotriz',
        descripcion: 'Curso en el área de MECANICA AUTOMOTRIZ con estandares industriales a nivel global.'

    }
]

export const ImageGallery: React.FC = () => {
    return (
        <Box sx={{ width: "100%", textAlign: "center" }}>
            <Box sx={{ mt: 2, mb: 4 }}>
                <img src={logotipo} alt='Técnologico Kalum' style={{ width: "250px", maxWidth: "90%", marginBottom: "8px" }} />
                <Typography variant='h4' sx={{ fontWeight: "bold", mt: 1 }}>TECNOLOGICO KALUM</Typography>
            </Box>
            <Grid container spacing={3} columns={12} sx={{ padding: 3, display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {itemData.map((item) => (
                    <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}  sx={{ display: "flex" }}>
                        <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                            <CardMedia
                                component="img"
                                image={item.img}
                                alt={item.title}
                                sx={{
                                    width: "100%",
                                    height: 250,
                                    objectFit: "contain",
                                    backgroundColor: "#000", // opcional si quieres fondo detrás
                                    padding: 1
                                }}
                            />
                            <CardContent>
                                <Typography variant='h6' sx={{ fontWeight: "bold", mb: 0.5 }}>{item.title}</Typography>
                                <Typography variant='body2' sx={{ color: "text.secondary" }}>
                                    Técnologico Kalum
                                </Typography>
                            </CardContent>
                            <div style={{ background: "#F9A825", padding: "16px", textAlign: "center" }}>
                                <Typography variant='body2' sx={{ colors: "white", fontWeight: 600 }}>
                                    {item.descripcion}
                                </Typography>
                            </div>
                            <CardActions sx={{ justifyContent: "space-between" }}>
                                <Button size='small'>ASIGNARME</Button>
                                <Button size='small'>COMPARTIR|</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

