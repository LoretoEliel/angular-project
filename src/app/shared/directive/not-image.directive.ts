import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[appNotImage]'
})
export class NotImageDirective {
    constructor(
        private elementImg: ElementRef
    ) {}

    @HostListener('error')
    onError(): void {
        this.elementImg.nativeElement.src = "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg";
    }
}