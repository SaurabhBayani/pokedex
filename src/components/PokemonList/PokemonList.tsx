import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { List, ListItem, CircularProgress } from '@material-ui/core';
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

  const [filteredPokemons, setFilteredPokemons] = useState<any>(pokemons);
  const [searchTerm, setSearchTerm] = useState<string>('');

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
        {/* Loading State */}
        {loading && (
          <div className={classes.centerMessage}>
            <CircularProgress color="inherit" className={classes.loader} />
            {loadingMessage}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={classes.centerMessage}>
            {errorMessage || error?.message || 'Something went wrong'}
          </div>
        )}

        {/* No Pokémon Found */}
        {!loading && !error && filteredPokemons.length === 0 && (
          <div className={classes.centerMessage}>{MESSAGES.NO_POKEMON_FOUND}</div>
        )}

        {/* Pokémon List */}
        {!loading && !error && filteredPokemons.length > 0 && (
          <List>
            {filteredPokemons.map((pkmn) => (
              <ListItem
                key={pkmn.id}
                button
                component={Link}
                to={`/pokemon/${pkmn.name}/${pkmn.id}`}
                className={classes.listItem}
              >
                <PokemonListItem pokemonDetails={pkmn} />
              </ListItem>
            ))}
          </List>
        )}
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
      fontFamily: `'Roboto', 'Segoe UI', sans-serif`,
    },
    searchBarWrapper: {
      marginBottom: '12px',
      flexShrink: 0,
    },
    scrollArea: {
      flexGrow: 1,
      overflowY: 'auto',
    },
    centerMessage: {
      fontSize: '18px',
      color: '#888',
      marginTop: '20px',
      textAlign: 'center',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listItem: {
      padding: 0,
      '&:hover': {
        backgroundColor: '#f9f9f9',
      },
    },
    loader: {
      marginBottom: '12px',
    },
  },
  { name: 'PokemonList' }
);
