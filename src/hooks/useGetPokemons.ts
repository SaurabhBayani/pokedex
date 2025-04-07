import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  image: string;
  name: string;
  number: string;
  types: string[];
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
  number: Pokemon['number'];
  types: Pokemon['types'];
  imageURL: Pokemon['image'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      types
      image
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () =>
      pokemons.map((p: Pokemon) => ({
        value: p.id,
        label: p.name,
        number: p.number,
        types: p.types,
        imageURL: p.image,
      })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};
