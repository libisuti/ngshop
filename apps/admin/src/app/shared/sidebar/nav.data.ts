// export const navbarData = [
//     {
//         routerLink: 'dashbroad',
//         icon: 'fa-solid fa-house',
//         label: 'Dashbroad'
//     },
//     {
//         routerLink: 'categories',
//         icon: 'fa-solid fa-cart-shopping',
//         label: 'Categories'
//     },
//     {
//         routerLink: 'products',
//         icon: 'fa-solid fa-box-open',
//         label: 'Products'
//     },
//     {
//         routerLink: 'users',
//         icon: 'fa-solid fa-user-secret',
//         label: 'Users'
//     },
//     {
//         routerLink: 'orders',
//         icon: 'fa-solid fa-truck',
//         label: 'Orders'
//     }
// ];

import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashbroad',
        icon: 'fa-solid fa-house',
        label: 'Dashbroad'
    },
    // {
    //     routeLink: 'products',
    //     icon: 'fal fa-box-open',
    //     label: 'Products',
    //     items: [
    //         {
    //             routeLink: 'products/level1.1',
    //             label: 'Level 1.1',
    //             items: [
    //                 {
    //                     routeLink: 'products/level2.1',
    //                     label: 'Level 2.1'
    //                 },
    //                 {
    //                     routeLink: 'products/level2.2',
    //                     label: 'Level 2.2',
    //                     items: [
    //                         {
    //                             routeLink: 'products/level3.1',
    //                             label: 'Level 3.1'
    //                         },
    //                         {
    //                             routeLink: 'products/level3.2',
    //                             label: 'Level 3.2'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             routeLink: 'products/level1.2',
    //             label: 'Level 1.2'
    //         }
    //     ]
    // },
    {
        routeLink: 'categories',
        icon: 'fa-solid fa-cart-shopping',
        label: 'Categories',
        items: [
            {
                routeLink: 'categories',
                label: 'Categories'
            },
            {
                routeLink: 'categoryfollow',
                label: 'CategoryProduct'
            }
        ]
    },
    {
        routeLink: 'products',
        icon: 'fa-solid fa-box-open',
        label: 'Products'
    },

    {
        routeLink: 'users',
        icon: 'fa-solid fa-user-secret',
        label: 'Users'
    },
    {
        routeLink: 'orders',
        icon: 'fa-solid fa-truck',
        label: 'Orders'
    }
];
