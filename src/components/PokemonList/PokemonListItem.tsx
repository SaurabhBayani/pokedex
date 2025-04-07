import { createUseStyles } from 'react-jss';
import { Typography } from '@material-ui/core';

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
    const { name, number, types = [], image } = pokemonDetails;

    return (
        <div className={classes.pokemonListItem}>
            <div className={classes.numberText}>#{number}</div>

            <div className={classes.imageWrapper}>
                <img loading="lazy" src={image} alt={name} />
            </div>

            <div className={classes.infoWrapper}>
                <Typography component="div" variant="h6" className={classes.name}>
                    {name}
                </Typography>
                <Typography variant="body2" className={classes.types}>
                    {types.join(', ')}
                </Typography>
            </div>
        </div>
    );
};

const useStyles = createUseStyles(
    {
        pokemonListItem: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#1e1e1e',
            border: '1px solid #444',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
            transition: 'all 0.2s ease',
            '&:hover': {
                backgroundColor: '#2a2a2a',
                boxShadow: '0 4px 10px rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
            },
        },
        numberText: {
            fontSize: '18px',
            color: '#f0f0f0',
            fontFamily: '"Courier New", Courier, monospace',
            marginRight: '16px',
        },
        imageWrapper: {
            width: '100px',
            height: '100px',
            marginRight: '16px',
            '& img': {
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid #ddd',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            },
        },
        infoWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        name: {
            color: '#fff',
            marginBottom: '8px',
        },
        types: {
            color: '#ccc',
        },
    },
    { name: 'PokemonListItem' }
);
