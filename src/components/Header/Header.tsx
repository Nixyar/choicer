import {Avatar, FormControl, InputAdornment, TextField} from '@mui/material';
import React from 'react'
import './Header.css';
import {useLocation} from 'react-router-dom';
import {routes} from '../../Root';
import {LoopIcon} from '../icons/Loop';

export const Header = () => {
  let location = useLocation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event);
  };

  const checkLocationWorkPath = (): boolean => {
    return location.pathname === routes.works || location.pathname === routes.createWork;
  }

  return (
      <header className="header">
        {!checkLocationWorkPath() ?
            <FormControl>
              <TextField
                  sx={{width: 563}}
                  onChange={handleChange}
                  placeholder="Поиск работы / преподавателя"
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <LoopIcon/>
                        </InputAdornment>
                    ),
                  }}
              />
            </FormControl> :
            <div className="header__works h5">
              <h3>Работы</h3>
            </div>
        }
        <div className="header__profile">
          <Avatar src="" sx={{width: 60, height: 60, border: 2, borderColor: '#FDD05A'}}/>
          <p className="header__profile-info p2">Михаил Глуховский</p>
        </div>
      </header>
  )
}