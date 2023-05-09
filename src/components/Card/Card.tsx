import {Avatar, Box, Fade, Button} from '@mui/material';
import React from 'react';
import './Card.css';
import {ICard} from '../../interfaces/home.interface';
import Modal from '@mui/material/Modal';

export const Card = ({
  curator,
  description,
  participants,
  title,
  editedDays,
  files,
  size,
  type,
  isRequired,
  endOfDate,
}: ICard) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const submitCard = (): void => {
    onCloseModal();
  }

  const formatData = (data: Date | string): string => {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  return (
      <>
        <div className="card" onClick={onOpenModal}>
          <h3 className="card-title h3">{title}</h3>
          <div className="card-curator p4">
            Куратор:
            <span><Avatar src={curator.photo}
                          sx={{width: 34, height: 34, border: 2, borderColor: '#FDD05A'}}/></span>
            {curator.fullName}
          </div>
          <p className="card-description p3">{description}</p>
          <div className="card__footer p5">
            <span>изменено {editedDays} дней назад</span>
            <span>Участники: {participants}</span>
          </div>
        </div>
        <Modal
            open={isOpenModal}
            onClose={onCloseModal}
        >
          <Fade in={isOpenModal}>
            <Box className="card-modal">
              <h2 className="card-modal__modal-title h2">Взять в работу</h2>
              <h3 className="card-modal__title h3">{title}</h3>
              <div className="card-modal__curator p3">
                <span><Avatar src={curator.photo} sx={{
                  width: 34,
                  height: 34,
                  border: 2,
                  borderColor: '#FDD05A',
                }}/></span>
                <div className="card-modal__curator-info">
                  {curator.fullName}
                  <div>Преподаватель</div>
                </div>
              </div>
              <div className="card-modal__table p3">
                <div>
                  <p>Тип работы:</p><p>{type}</p>
                </div>
                <div>
                  <p>Сроки:</p><p>{formatData(endOfDate)}</p>
                </div>
                <div>
                  <p>Объем:</p><p>{size} страниц</p>
                </div>
                <div>
                  <p>Выполнение:</p><p>{isRequired ? 'Обязательно' : 'Необязательно'}</p>
                </div>
              </div>
              <div className="card-modal__files p2">Вложения: {files.length}</div>
              <div className="card-modal__button">
                <Button variant="contained" onClick={submitCard}>Отправить отклик</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </>
  )
}