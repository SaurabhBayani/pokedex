import { createUseStyles } from 'react-jss';

import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Chip,
} from '@material-ui/core';
import { MESSAGES } from '../../constants/Strings';


type Pokemon = {
    id: string;
    name: string;
    number: string;
    types: string[];
    image: string;
};

type PokemonListItemProps = {
    pokemonDetails: Pokemon;

};

export const PokemonListItem = ({ pokemonDetails }: PokemonListItemProps) => {

    const classes = useStyles();

    const { id, name, number, types = [], image } = pokemonDetails;

    return (
        <ListItem key={id} alignItems="center" className={classes.pokemonListItem}>
            <div className={classes.numberText}>#{number}</div>
            <div className={classes.imageWrapper}>
                <img loading="lazy" src={image} alt={name} />
            </div>
            <div className={classes.infoWrapper}>
                <Typography component="div" variant="h3" className={classes.header}>{name}</Typography>
                <div className={classes.types}>{types.join(', ')}</div>
            </div>
        </ListItem>
    )
}

const useStyles = createUseStyles(
    {
        pokemonListItem: {
            marginBottom: '10px',
            padding: '20px 10px 20px 10px',
            border: '1px solid transparent',
            borderRadius: '8px',
            backgroundColor: '#333333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            '&:hover': {
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                backgroundColor: '#666666',
                boxShadow: '0 2px 4px #ffffff',

            },
        },
        imageWrapper: {
            width: '150px',
            height: '150px',
            marginRight: '20px',
            '& img': {
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                marginRight: '20px',
                border: '1px solid #f0f0f0',
                boxShadow: '0 2px 4px #000000',
                objectFit: 'fill',
            },
        },
        header: {
            alignSelf: 'flex-start',
        },
        numberText: {
            fontSize: '20px',
            color: '#efefef',
            fontFamily: 'courier',
            marginRight: '20px',
        },
        infoWrapper: {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignSelf: 'flex-start',
            alignItems: 'self-start',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginLeft: '10px',
        },
        types: {
            marginTop: '20px',
            marginLeft: '10px',
        }
    },
    { name: 'PokemonListItem' }
);