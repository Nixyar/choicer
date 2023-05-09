import {Avatar, Box, Button, Fade} from '@mui/material';
import Modal from '@mui/material/Modal';
import React, {useState} from 'react';
import {ICard} from '../../interfaces/home.interface';
import './ModalCard.css';

export type ModalCardProps = {
  isOpen: boolean;
  card: ICard;
  onChangeClose: () => void;
};

export const ModalCard = ({isOpen, card, onChangeClose}: ModalCardProps) => {
  const [isInProcessWorks, setIsInProcessWorks] = useState([]);

  const formatData = (data: Date | string): string => {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  const submitWork = (id: any) => {
    setIsInProcessWorks((prevIds: any) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((buttonId: any) => buttonId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  const checkActiveWork = (workId: any): boolean => {
    // @ts-ignore
    return isInProcessWorks.includes(workId);
  }

  return (
      <Modal
          open={isOpen}
          onClose={onChangeClose}
      >
        <Fade in={isOpen}>
          <Box className="card-modal">
            <h2 className="card-modal__modal-title h2">Взять в работу</h2>
            <h3 className="card-modal__title h3">{card.title}</h3>
            <div className="card-modal__curator p3">
                <span><Avatar src={card.curator.photo} sx={{
                  width: 34,
                  height: 34,
                  border: 2,
                  borderColor: '#FDD05A',
                }}/></span>
              <div className="card-modal__curator-info">
                {card.curator.fullName}
                <div>Преподаватель</div>
              </div>
            </div>
            <div className="card-modal__works">
              {card.works.length ? card.works.map(work => (
                  <div className="card-modal__work" key={work.title}>
                    <h4 className="card-modal__work-title h4">{work.title}</h4>
                    <div className="card-modal__table p3">
                      <div>
                        <p>Тип работы:</p><p>{work.type}</p>
                      </div>
                      <div>
                        <p>Сроки:</p><p>{formatData(work.endOfDate)}</p>
                      </div>
                      <div>
                        <p>Объем:</p><p>{work.size} страниц</p>
                      </div>
                      <div>
                        <p>Выполнение:</p><p>{work.isRequired ? 'Обязательно' : 'Необязательно'}</p>
                      </div>
                    </div>
                    <div className="card-modal__files p2">Вложения: {work.files.length}</div>
                    <div className="card-modal__button">
                      <Button variant="contained"
                              style={{
                                backgroundColor: checkActiveWork(work.title) ? "#6ab04c" : "#3f51b5",
                                color: checkActiveWork(work.title) ? "#fff" : "#fff",
                              }}
                              onClick={() => submitWork(work.title)}>
                        {checkActiveWork(work.title) ? 'Отменить отклик' : 'Отправить отклик'}
                      </Button>
                    </div>
                  </div>
              )) : null}
            </div>
          </Box>
        </Fade>
      </Modal>
  );
};