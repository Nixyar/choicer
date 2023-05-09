export interface ICurator {
  photo: string;
  fullName: string;
}

export interface ICard {
  title: string;
  curator: ICurator;
  description: string;
  editedDays: number;
  participants: [] | null;
  type: string;
  endOfDate: Date | string;
  size: number;
  isRequired: boolean;
  files: any[];
  isTakeToWork: boolean;
}