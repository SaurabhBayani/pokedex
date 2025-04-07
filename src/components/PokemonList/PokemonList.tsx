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
      <div className={classes.searchBarWrapper}>
        <SearchBar
          placeholder={MESSAGES.SEARCH_POKEMON}
          onChange={handleSearchChange}
        />
      </div>

      <div className={classes.scrollArea}>
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
    </div>
  );
};

const useStyles = createUseStyles(
  {
    listingPage: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      padding: '16px',
      boxSizing: 'border-box',
    },
    searchBarWrapper: {
      marginBottom: '12px',
      flexShrink: 0,
    },
    scrollArea: {
      flexGrow: 1,
      overflowY: 'auto',
    },
    loader: {
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
      marginTop: '20px',
      textAlign: 'center',
    },
  },
  { name: 'PokemonList' }
);
