import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

import { ErrorMessage } from '@freescan/http';


@Injectable()
export class AlertService {
    constructor(private toastr: ToastsManager) {
    }

    public success(title: string, message: string): void {
        this.toastr.success(message, title);
    }

    public info(title: string, message: string): void {
        this.toastr.info(message, title);
    }

    public warning(title: string, message: string): void {
        this.toastr.warning(message, title);
    }

    public error(title: string, message: string): void {
        this.toastr.error(message, title);
    }

    public errorMessage(error: ErrorMessage): void {
        this.toastr.error(error.message, `${error.statusText}`, { toastLife: 10000 });
    }
}
