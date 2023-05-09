export interface ICurator {
  photo: string;
  fullName: string;
}

export interface IWork {
  title: string;
  type: 'курсовая' | 'дипломная' | 'доклад';
  endOfDate: Date | string;
  size: number;
  isRequired: boolean;
  files: any[];
  isTakeToWork: boolean;
}

export interface ICard {
  id?: number;
  title: string;
  curator: ICurator;
  works: IWork[] | [];
  description: string;
  editedDays: number;
  participants: [] | null;
}