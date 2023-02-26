import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import moment from 'moment';
// import format from 'date-fns/format';
// import parseISO from 'date-fns/parseISO';

import { useDispatch } from 'react-redux';
import { deleteCase, likeCase } from '../../../actions/cases';

import useStyles from './styles';
import courtLogo from '../../../images/courtLogo.png'; //'../../../images/courtLogo.png';

import format from 'date-fns/format';
// date = datefns.format(new Date(2017, 09, 12), "dd.MM.yy");
// let d = new Date(date);
// d = date.toLocaleDateString('uk');

const Case = ({ caseFile, setCurrentId }) => {

    const getRegisterNumber = (caseType) => {
        switch (caseType) {
            case 'Civil Appeal':
                return '/13';
            case 'Suit':
                return '/1';
            case 'Family Appeal':
                return '/FCA';
            case 'Session Case':
                return '/II';
            case 'CNSA Case':
                return '/II';
            default:
                return "";
        }
    }

    const classes = useStyles();
    const dispatch = useDispatch();
    const institutionDate = new Date(caseFile.institutionDate);

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={caseFile.selectedFile ? caseFile.selectedFile : courtLogo} title={caseFile.title} />
            <div className={classes.overlay}>
                <Typography variant='h6'>Case Number: {caseFile.caseNumber + getRegisterNumber(caseFile.caseSubType)}</Typography>
                {/* <Typography variant='body2'>{moment(caseFile.institutionDate).fromNow()}</Typography> */}
                {/* <Typography variant='body2'>{format(parseISO(caseFile.institutionDate), 'dd/MM/yyyy')}</Typography> */}
                <Typography variant='body2'>{format(institutionDate, "dd/MM/yyy")}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{ color: 'white' }} size='small' onClick={() => {
                    setCurrentId(caseFile._id)
                }}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant='body2' color='textSecondary'>
                    {caseFile.caseType}
                </Typography>
            </div>
            <Typography className={classes.title} variant='h5' gutterBottom>
                {caseFile.title}
            </Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p' >
                    {caseFile.title}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => dispatch(likeCase(caseFile._id))}>
                    <ThumbUpAltIcon fontSize='small' />
                    &nbsp;{caseFile.likeCount}&nbsp;
                    {caseFile.likeCount <= 1 ? 'Like so far' : 'Likes'}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deleteCase(caseFile._id))}>
                    <DeleteIcon fontSize='small' />
                    Delete
                </Button>
            </CardActions>
        </Card>

    );
}

export default Case;