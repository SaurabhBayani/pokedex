import { createUseStyles } from 'react-jss';
import { PokemonList } from '../components';
import { MESSAGES } from '../constants/Strings';

export const ListPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonList
        loadingMessage={MESSAGES.FETCHING_POKEMON_LIST}
        errorMessage={MESSAGES.ERROR_FETCHING_POKEMON_LIST}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
