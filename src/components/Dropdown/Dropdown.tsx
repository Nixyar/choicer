import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import React from 'react';
import {IDropdown} from '../../interfaces/Dropdown.interface';
import './Dropdown.css';

export const Dropdown = ({placeholder, list}: IDropdown) => {
  const [item, setItem] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value);
  };

  return (
      <FormControl sx={{ minWidth: 208, marginRight: '15px'}}>
        <Select
            displayEmpty
            value={item}
            onChange={handleChange}
            sx={{height: 35, padding: '8px 15px', borderRadius: '60px'}}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {list.map((item) => (
              <MenuItem key={item.label} value={item.label}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}