import {ICard} from '../interfaces/home.interface';

export const cards: ICard[] = [
  {
    id: 1,
    title: 'Автоматизация переработки сырья',
    curator: {
      photo: '',
      fullName: 'Захаренко Андрей Альбертович'
    },
    works: [
        {
          title: 'Сырьё и что с этим связано',
          type: 'курсовая',
          endOfDate: '2023-05-16',
          size: 16,
          isRequired: true,
          files: [],
          isTakeToWork: true
        },
      {
        title: 'Сырьё и что из него производят',
        type: 'доклад',
        endOfDate: '2023-05-16',
        size: 16,
        isRequired: true,
        files: [],
        isTakeToWork: true
      },
    ],
    description: 'Предлагаю к просмотру следущее видео по ссылке, чтобы подробно рассмотреть этот процесс.',
    editedDays: 5,
    participants: null,
  },
  {
    id: 2,
    title: 'Обработка потоков данных',
    curator: {
      photo: '',
      fullName: 'Анатолий Борисович Чубайс'
    },
    works: [
      {
        title: 'Поток данных',
        type: 'доклад',
        endOfDate: '2023-05-16',
        size: 16,
        isRequired: true,
        files: [],
        isTakeToWork: true
      },
    ],
    description: 'Предлагаю к просмотру следущее видео по ссылке, чтобы подробно рассмотреть этот процесс.',
    editedDays: 5,
    participants: null,
  },
];