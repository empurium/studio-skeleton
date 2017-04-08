import { ToastOptions } from 'ng2-toastr';


export class ToastConfig extends ToastOptions {
    // public animate: string = 'flyRight';
    public showCloseButton: boolean = true;
    public newestOnTop: boolean = true;
}
