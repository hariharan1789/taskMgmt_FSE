import { ToastrService } from 'ngx-toastr';
import { Router, NavigationStart } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AlertService {
    private keepAfterRouteChange = false;

     // function to show warning
    warn(message: string, title: string, timeout: number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.warning(message, title, {timeOut: timeout});
    }
    clear() {
        this.toastr.clear();
    }

// function to show error
    error(message: string, title: string, timeout: number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.error(message, title, {timeOut: timeout});
    }

// function to show message
    success(message: string, title: string, timeout: number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.success(message, title, {timeOut: timeout});
    }
// function to info message
    info(message: string, title: string, timeout: number, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.toastr.info(message, title, {timeOut: timeout});
    }

    constructor(private router: Router, private toastr: ToastrService) {

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.toastr.clear();
                }
            }
        });
    }
}
