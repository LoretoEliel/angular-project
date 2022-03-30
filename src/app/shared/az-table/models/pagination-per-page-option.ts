export class PaginationPerPageOption {
  public value: string;
  public label: string;
  public selected?: boolean;

  constructor(value: string, label: string, selected = false) {
    this.value = value;
    this.label = label;
    this.selected = selected;
  }
}
