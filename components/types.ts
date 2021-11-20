export interface DataType {
  key?: string;
  day?: string;
  noteText?: string;
  onPressClearNote?: (id: string) => void;
}
