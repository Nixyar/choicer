import {
  Avatar,
  FormControl,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import React, {useState} from 'react'
import './Header.css';
import {useLocation} from 'react-router-dom';
import {cards} from '../../data/cards';
import {routes} from '../../Root';
import {LoopIcon} from '../icons/Loop';

export const Header = () => {
  let location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const handleSearchBlur = () => {
    setIsSearchOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredData = cards.filter(
      (item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.curator.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const checkLocationWorkPath = (): boolean => {
    return location.pathname === routes.works || location.pathname === routes.createWork;
  }

  return (
      <header className="header">
        {!checkLocationWorkPath() ?
            <FormControl>
              <TextField
                  sx={{width: 563}}
                  onChange={handleSearch}
                  placeholder="Поиск работы / преподавателя"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <LoopIcon/>
                        </InputAdornment>
                    ),
                  }}
              />
              <List className="header__search-list" sx={{ position: 'absolute', padding: 0 }}>
                {searchValue.length && isSearchOpen ? filteredData.map((item) => (
                    <ListItem key={item.id} className="header__search-list-item">
                      <ListItemText
                          primary={item.title}
                          secondary={`Куратор: ${item.curator.fullName}`}
                      />
                    </ListItem>
                )) : null}
              </List>
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