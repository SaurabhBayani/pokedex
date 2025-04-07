import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { List, ListItem } from '@material-ui/core';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { MESSAGES } from '../../constants/Strings';

import { PokemonListItem } from './PokemonListItem';
import { SearchBar } from '../SearchBar';

type PokemonListProps = {
  loadingMessage?: string;
  errorMessage?: string;
};

export const PokemonList = ({
  loadingMessage = MESSAGES.LOADING,
  errorMessage,
}: PokemonListProps) => {
  const classes = useStyles();
  const { pokemons, loading, error } = useGetPokemons();

  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pkmn) =>
        pkmn.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [searchTerm, pokemons]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className={classes.listingPage}>
      <SearchBar
        placeholder={MESSAGES.SEARCH_POKEMON}
        onChange={handleSearchChange}
      />

      {loading && <div className={classes.loader}>{loadingMessage}</div>}
      {error && <div className={classes.loader}>{errorMessage || error.message}</div>}

      {!loading && !error && filteredPokemons.length === 0 && (
        <div className={classes.noResult}>{MESSAGES.NO_POKEMON_FOUND}</div>
      )}

      <List>
        {filteredPokemons.map((pkmn) => (
          <ListItem key={pkmn.id} className={classes.listItem}>
            <Link to={`/pokemon/details/${pkmn.id}`} className={classes.link}>
              <PokemonListItem pokemonDetails={pkmn} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
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
      fontSize: '18px',
      color: '#888',
      height: '100%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listItem: {
      padding: 0,
    },
    link: {
      display: 'block',
      width: '100%',
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    noResult: {
      fontSize: '18px',
      color: '#888',
      height: '100%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  { name: 'PokemonList' }
);
