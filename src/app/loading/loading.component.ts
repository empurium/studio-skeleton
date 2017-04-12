import { Component, Input } from '@angular/core';


@Component({
    selector:    'studio-loading',
    templateUrl: './loading.component.html',
})
export class LoadingComponent {
    @Input() public show: boolean = false;
    @Input() public type: string = 'sk-cube-grid';
}
