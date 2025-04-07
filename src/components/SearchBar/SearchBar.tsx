import { useState, useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import TextField from '@material-ui/core/TextField';
import { MESSAGES } from '../../constants/Strings';
import { debounce } from '../../utils';

type SearchBarProps = {
    placeholder?: string;
    onChange: (value: string) => void;
};

export const SearchBar = ({
    placeholder = MESSAGES.SEARCH_HERE,
    onChange,
}: SearchBarProps) => {
    const classes = useStyles();
    const [searchString, setSearchString] = useState<string>('');

    const handleTextChange = useCallback(
        debounce((value: string) => {
            onChange(value);
        }, 1000), // fires after 1s of inactivity
        [onChange]
    );

    const debouncedHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    );
};

const useStyles = createUseStyles(
    {
        search: {
            '& input': {
                marginTop: '20px',
                marginBottom: '40px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#1e1e1e',
                color: '#fff',
                height: '50px',
                padding: '0 16px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border 0.2s ease, box-shadow 0.2s ease',
                '&:focus': {
                    border: '1px solid #00bcd4',
                    boxShadow: '0 0 0 2px rgba(0, 188, 212, 0.2)',
                },
            },
        },
    },
    { name: 'SearchBar' }
);
