import { TableFieldType } from './table-field-type.enum';

export class TableField {
  /**
   * La clave para seleccionar datos del registro en la matriz de elementos.
   */
  public key: string;

  /**
   * Aparece en el encabezado de la tabla de columnas.
   */
  public label: string;

  /**
   * Traduccion del encabezado de la tabla de columnas.
   */
  public translation?: string;

  /**
   * Habilite el ordenando en esta columna.
   */
  public sortable?: boolean;

  /**
   * Habilite la edicion en esta columna.
   */
  public editable?: boolean;

  /**
   * Nombre de clase (o matriz de nombres de clase) para agregar a <th> y <td> en la columna.
   */
  public class?: string | Array<string>;

  /**
   * Nombre de clase (o matriz de nombres de clase) para agregar a las celdas de <tbody> data <td> en la columna.
   */
  public tdClass?: string | Array<string>;
  
  /**
   * Nombre de clase (o matriz de nombres de clase) para agregar a las celdas de <tbody> data <td> en la columna.
   */
  public maxlength?: number;

  /**
   * Nombre de clase (o matriz de nombres de clase) para agregar a la celda <thead> / <tfoot> del encabezado <th> de este campo.
   */
  public thClass?: string | Array<string>;

  public inputType?: TableFieldType;
  public inputRequired?: boolean;
  public readonly?: boolean;

  public html?: boolean;
  public exportable?: boolean;
  public width?: string | Array<string>;
  public textAlign?: string | Array<string>;

  constructor(key?: string, label?: string, translation?: string, sortable?: boolean, editable?: boolean, html?: boolean, width?: string, textAlign?: string, exportable?: boolean) {
    this.key = key ? key : '';
    this.label = label ? label : '';
    this.translation = translation;
    this.sortable = sortable ? sortable : false;
    this.editable = editable ? editable : false;
    this.html = html ? html : false;
    this.exportable = exportable ? exportable : false;
    this.width = width ? width : '';
    this.textAlign = textAlign ? textAlign : '';
  }
}
