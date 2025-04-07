import { Link, Outlet } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { List } from '@material-ui/core';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { MESSAGES } from '../../constants/Strings';

import PokemonListItem from './PokemonListItem';


type PokemonListProps = {
  loadingMessage?: string,
  errorMessage?: string
}

export const PokemonList = ({
  loadingMessage = MESSAGES.LOADING,
  errorMessage
  ,
}: PokemonListProps) => {
  const classes = useStyles();
  const { pokemons, loading, error } = useGetPokemons();

  return (
    <div className={classes.listingPage}>
      {
        loading && <div className={classes.loader}>{loadingMessage}</div>
      }

      {
        error && <div className={classes.loader}>{errorMessage || error.message}</div>
      }

      <List>
        {pokemons.map((pkmn) => (
          <Link to={`/pokemon/details/${pkmn.id}`} key={pkmn.id} className={classes.link}>
            <PokemonListItem pokemonDetails={pkmn} />
          </Link>
        ))}
      </List>
    </div >
  );
};

const useStyles = createUseStyles(
  {
    listingPage: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    loader: {
      height: '100%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        textDecoration: 'none',
      },
    }
  },
  { name: 'PokemonList' }
);
