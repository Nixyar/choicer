export interface IDropdown {
  placeholder: string;
  list: unknown[];
  onChange?: (value: string) => void;
}