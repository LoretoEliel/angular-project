export class TableFieldSelect {
  // id: Valor principal del select: value="" 
  public id: any;

  // label: Texto que se muestra para el usuario final
  public label: string;

  // solo para el primer campo el que se quiere marcar como selected
  public selected?: boolean;

  constructor(
    id: any,
    label: string,
    selected: boolean
  ) {
    this.id = id ? id : '';
    this.label = label ? label : '';
    this.selected = selected ? selected : false;
  }
}
