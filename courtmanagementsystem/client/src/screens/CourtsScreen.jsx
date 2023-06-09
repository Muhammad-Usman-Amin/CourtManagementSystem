import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import courtLogo from '../images/courtLogo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    card: {
        height: '100%',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '20%',
        maxHeight: '100%',
        objectFit: 'cover',
    },
    link: {
        textDecoration: 'none',
    },
    content: {
        textAlign: 'center',
    },
}));

// 'ADSJ at Chakdara'
// 'ADSJ at Samarbagh'}> ADSJ at Samarbagh</MenuItem >
//                                         <MenuItem value={'ADSJ at Lal Qilla'}>ADSJ at Lal Qilla</MenuItem>
//                                         <MenuItem value={'SCJ ADMIN'}>SCJ ADMIN</MenuItem>

//                                         <MenuItem value=""><em>Lower Courts</em></MenuItem>
//                                         <MenuItem value={'SCJ JUDICIAL at Timergara'}>SCJ JUDICIAL at Timergara</MenuItem>
//                                         <MenuItem value={'CJ-I at Timergara'}>CJ-I at Timergara</MenuItem>
//                                         <MenuItem value={'CJ-II at Timergara'}>CJ-II at Timergara</MenuItem>
//                                         <MenuItem value={'CJ-III at Timergara'}>CJ-III at Timergara</MenuItem>
//                                         <MenuItem value={'CJ-IV at Timergara'}>CJ-IV at Timergara</MenuItem>
//                                         <MenuItem value={'CJ-V at Timergara'}>CJ-V at Timergara</MenuItem>
//                                         <MenuItem value={'CJ-VI at Timergara'}>CJ-VI at Timergara</MenuItem>
//                                         <MenuItem value={'CJ-I at Chakdara'}>CJ-I at Chakdara</MenuItem>
//                                         <MenuItem value={'CJ-I at Lal Qilla'}>CJ-I at Lal Qilla</MenuItem>
// 'CJ-I at Samarbagh'
const courts = [
    { id: 1, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 2, name: 'Court of Additional District & Session Judge Timergara', image: courtLogo },
    { id: 3, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 4, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 5, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 6, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 7, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 8, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 9, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    { id: 10, name: 'Court of District & Session Judge Timergara', image: courtLogo },
    // Add more courts as needed
];

const CourtList = ({ onPageChange }) => {
    const classes = useStyles();

    useEffect(() => {
        onPageChange('Courts and Establishment Profiles');
    }, [onPageChange]);

    return (
        <Grid container spacing={1} className={classes.root}>
            {courts.map((court) => (
                <Grid item xs={12} sm={3} md={3} key={court.id}>
                    <Link to={`/court/${court.id}`} className={classes.link}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardContent className={classes.imageContainer}>
                                    <img src={court.image} alt={court.name} className={classes.image} />
                                </CardContent>
                                <CardContent className={classes.content}>
                                    <Typography variant="h6">{court.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default CourtList;
