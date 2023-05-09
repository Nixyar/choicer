import {Avatar} from '@mui/material';
import React, {useState} from 'react';
import './Card.css';
import {ICard} from '../../interfaces/home.interface';
import {ModalCard} from '../ModalCard/ModalCard';

export const Card = ({
  curator,
  description,
  participants,
  title,
  editedDays,
  works
}: ICard) => {
  const [isOpenModal, setOpenModal] = useState(false)

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);
  const modalCardInfo: ICard = {
    curator: curator,
    description: description,
    participants: participants,
    title: title,
    editedDays: editedDays,
    works: works
  };

  return (
      <>
        <div className="card" onClick={onOpenModal}>
          <div>
            <h3 className="card-title h3">{title}</h3>
            <div className="card-curator p4">
              Куратор:
              <span><Avatar src={curator.photo}
                            sx={{width: 34, height: 34, border: 2, borderColor: '#FDD05A'}}/></span>
              {curator.fullName}
            </div>
            <p className="card-description p3">{description}</p>
          </div>
          <div className="card__footer p5">
            <span>изменено {editedDays} дней назад</span>
            <span>Участники: {participants}</span>
          </div>
        </div>
        <ModalCard isOpen={isOpenModal} card={modalCardInfo} onChangeClose={onCloseModal}/>
      </>
  )
}