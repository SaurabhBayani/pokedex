import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
    id: string;
    number: string;
    name: string;
    types: string[];
    image: string;
};

export const GET_POKEMON = gql`
query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
    id
    number
    name
    weight{
        minimum
        maximum
    }
    height{
        minimum
        maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
    }
}
`;

export const useGetPokemonDetails = (id: any, name: any) => {
    const { data, ...queryRes } = useQuery(GET_POKEMON, {
        variables: { id, name },
    });

    const pokemon: Pokemon = useMemo(() => data?.pokemon || [], [data]);

    return {
        pokemon,
        ...queryRes,
    };
};
