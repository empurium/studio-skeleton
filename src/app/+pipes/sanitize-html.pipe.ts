import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({ name: 'freescanSanitizeHtml' })
export class FreeScanSanitizeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    public transform(html: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
