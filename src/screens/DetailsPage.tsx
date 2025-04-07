import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Modal,
    Backdrop,
    Fade,
    IconButton,
    makeStyles,
    CircularProgress,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// Hooks
import { useGetPokemonDetails } from '../hooks/useGetPokemonDetails';

export const DetailsPage: React.FC = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const { id = '', name = '' } = useParams<{ id: string; name: string }>();
    const navigate = useNavigate();

    const { pokemon, loading, error } = useGetPokemonDetails(id, name);

    const handleClose = () => {
        setOpen(false);
        navigate(-1); // Go back to previous page
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 300 }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <div className={classes.header}>
                        <Typography variant="h6">
                            {name || 'Pokemon Details'}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            className={classes.closeButton}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className={classes.loader}>
                            <CircularProgress color="inherit" />
                            <Typography variant="body2" style={{ marginLeft: 10 }}>
                                Loading...
                            </Typography>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <Typography color="error">
                            Something went wrong: {error.message}
                        </Typography>
                    )}

                    {/* Data */}
                    {!loading && !error && pokemon && (
                        <div className={classes.content}>
                            <img
                                src={pokemon.image}
                                alt={name}
                                className={classes.image}
                                loading="lazy"
                            />

                            <Table className={classes.table}>
                                <TableBody>
                                    <TableRow><TableCell>ID</TableCell><TableCell>{pokemon.id}</TableCell></TableRow>
                                    <TableRow><TableCell>Number</TableCell><TableCell>{pokemon.number}</TableCell></TableRow>
                                    <TableRow><TableCell>Name</TableCell><TableCell>{pokemon.name}</TableCell></TableRow>
                                    <TableRow>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>{pokemon.weight?.minimum} - {pokemon.weight?.maximum}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Height</TableCell>
                                        <TableCell>{pokemon.height?.minimum} - {pokemon.height?.maximum}</TableCell>
                                    </TableRow>
                                    <TableRow><TableCell>Classification</TableCell><TableCell>{pokemon.classification}</TableCell></TableRow>
                                    <TableRow><TableCell>Types</TableCell><TableCell>{pokemon.types?.join(', ')}</TableCell></TableRow>
                                    <TableRow><TableCell>Resistant</TableCell><TableCell>{pokemon.resistant?.join(', ')}</TableCell></TableRow>
                                    <TableRow><TableCell>Weaknesses</TableCell><TableCell>{pokemon.weaknesses?.join(', ')}</TableCell></TableRow>
                                    <TableRow><TableCell>Flee Rate</TableCell><TableCell>{pokemon.fleeRate}</TableCell></TableRow>
                                    <TableRow><TableCell>Max CP</TableCell><TableCell>{pokemon.maxCP}</TableCell></TableRow>
                                    <TableRow><TableCell>Max HP</TableCell><TableCell>{pokemon.maxHP}</TableCell></TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </Fade>
        </Modal>
    );
};

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#4B5066',
        borderRadius: '8px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3),
        position: 'relative',
        width: '90%',
        maxWidth: '500px',
        outline: 'none',
        color: '#fff',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    closeButton: {
        padding: theme.spacing(1),
        color: '#fff',
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    },
    content: {
        textAlign: 'center',
    },
    image: {
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        marginBottom: theme.spacing(2),
        borderRadius: '8px',
    },
    table: {
        width: '100%',
        marginTop: theme.spacing(2),
        '& td': {
            color: '#fff',
            padding: '8px 12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '& td:first-child': {
            fontWeight: 600,
            width: '40%',
        },
    },
}));
