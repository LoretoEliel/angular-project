import { ErrorMessage } from "./error-message";

export class ErrorMessageDisplay extends ErrorMessage {
  constructor(key: string, value?: string, display?: string){
    super(key, value);
    this.display = display;
  }
  display?: string
}
