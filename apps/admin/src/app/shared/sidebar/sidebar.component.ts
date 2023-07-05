import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { AuthService } from '@bluebits/users';
import { navbarData } from './nav.data';
import { style, transition, trigger, animate, keyframes } from '@angular/animations';

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [style({ opacity: 0 }), animate('350ms', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('350ms', style({ opacity: 0 }))])
        ]),

        trigger('rotate', [
            transition(':enter', [
                animate('1000ms', keyframes([style({ transform: 'rotate(0)', offset: '0' }), style({ transform: 'rotate(2turn)', offset: '1' })]))
            ])
        ])
    ]
})
export class SidebarComponent implements OnInit {
    constructor(private authService: AuthService) {}

    logoutUser() {
        this.authService.logout();
    }

    //  sidebar animation
    @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
    collapsed = false;
    screenWidth = 0;
    navData = navbarData;

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
        this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }

    closeSidenav(): void {
        this.collapsed = false;
        this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenWidth = window.innerWidth;
        if (this.screenWidth <= 768) {
            this.collapsed = false;
            this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
        }
    }
}
