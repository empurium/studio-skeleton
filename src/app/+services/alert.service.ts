import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

import { ErrorMessage } from '@rndstudio/http';


@Injectable()
export class AlertService {
    constructor(private toastr: ToastsManager) {
    }

    public success(title: string, message: string, timeout: number = 3000): void {
        this.toastr.success(message, title, { toastLife: timeout });
    }

    public info(title: string, message: string, timeout: number = 3000): void {
        this.toastr.info(message, title, { toastLife: timeout });
    }

    public warning(title: string, message: string, timeout: number = 3000): void {
        this.toastr.warning(message, title, { toastLife: timeout });
    }

    public error(title: string, message: string, timeout: number = 3000): void {
        this.toastr.error(message, title, { toastLife: timeout });
    }

    public errorMessage(error: ErrorMessage, timeout: number = 10000): void {
        this.toastr.error(error.message, `${error.statusText}`, { toastLife: timeout });
    }
}
