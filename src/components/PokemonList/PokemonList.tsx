import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { MESSAGES } from '../../constants/Strings';


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
    <div className={classes.root}>
      {
        loading && <div className={classes.loader}>{loadingMessage}</div>
      }

      {
        error && <div className={classes.loader}>{errorMessage || error.message}</div>
      }

      {pokemons.map((pkmn) => (
        <div key={pkmn.id}>{pkmn.name}</div>
      ))}

    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
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
  },
  { name: 'PokemonList' }
);
