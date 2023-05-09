import {
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import React, {useState} from 'react';
import {IDropdown} from '../../interfaces/dropdown.interface';
import './Dropdown.css';

export const Dropdown = ({placeholder, list, onChange}: IDropdown) => {
  const [item, setItem] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setItem(value);
    if (onChange) onChange(value)
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
          {list.map((item: any) => (
              <MenuItem key={item.label || item} value={item.label || item}>{item.label || item}</MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}