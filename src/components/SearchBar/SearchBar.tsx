import { useState, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TextField from "@material-ui/core/TextField";

import { MESSAGES } from "../../constants/Strings";

import { debounce } from '../../utils';


type SearchBarProps = {
    placeholder?: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({
    placeholder = MESSAGES.SEARCH_HERE,
    onChange
}: SearchBarProps) => {

    const classes = useStyles();
    const [searchString, setSearchString] = useState('');

    const handleTextChange = useCallback(
        debounce((value: string) => {
            onChange(value);
        }, 1000), // fires only after 1 second of inactivity
        []
    );

    const debouncedHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSearchString(e.target.value);
        handleTextChange(e.target.value);
    };


    return (
        <TextField
            fullWidth
            placeholder={placeholder}
            value={searchString}
            onChange={debouncedHandleChange}
            className={classes.search}
        />
    )
};

const useStyles = createUseStyles(
    {
        search: {
            '& input': {
                marginTop: '20px',
                marginBottom: '40px',
                borderRadius: '8px',
                border: '1px solid #f0f0f0',
                color: 'white',
                height: '60px',
                padding: '0 16px',
            },
        },
    },
    { name: 'SearchBar' }
);