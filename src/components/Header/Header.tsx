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
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {cards} from '../../data/cards';
import {ICard} from '../../interfaces/home.interface';
import {routes} from '../../Root';
import {IStore} from '../../store';
import {LoopIcon} from '../icons/Loop';
import {ModalCard} from '../ModalCard/ModalCard';
import ClickAwayListener from '@mui/base/ClickAwayListener';

export const Header = () => {
  let location = useLocation();
  const user = useSelector((state: IStore) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchCard, setSearchCard] = useState({
    id: 1,
    title: 'Автоматизация переработки сырья',
    curator: {
      photo: '',
      fullName: 'Захаренко Андрей Альбертович'
    },
    works: [],
    description: 'Предлагаю к просмотру следущее видео по ссылке, чтобы подробно рассмотреть этот процесс.',
    editedDays: 5,
    participants: null,
  });

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

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

  const selectSearchItem = (card: ICard): void => {
    // @ts-ignore
    setSearchCard(card);
    onOpenModal();
  }

  return (
      <>
        <header className="header">
          {!checkLocationWorkPath() ?
              <ClickAwayListener onClickAway={handleSearchBlur}>
                <FormControl>
                  <TextField
                      sx={{width: 563}}
                      onChange={handleSearch}
                      placeholder="Поиск работы / преподавателя"
                      onFocus={handleSearchFocus}
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
                        <ListItem key={item.id} className="header__search-list-item" onClick={() => selectSearchItem(item)}>
                          <ListItemText
                              primary={item.title}
                              secondary={`Куратор: ${item.curator.fullName}`}
                          />
                        </ListItem>
                    )) : null}
                  </List>
                </FormControl>
              </ClickAwayListener>
               :
              <div className="header__works h5">
                <h3>Работы</h3>
              </div>
          }
          <div className="header__profile">
            <Avatar src={user.image} sx={{width: 60, height: 60, border: 2, borderColor: '#FDD05A'}}/>
            <p className="header__profile-info p2">{`${user.first_name} ${user.last_name}`}</p>
          </div>
        </header>
        <ModalCard isOpen={isOpenModal} card={searchCard} onChangeClose={onCloseModal}/>
      </>
  )
}