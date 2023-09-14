import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';
import { combineLatest } from 'rxjs';
// import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashbroad.component.html'
})
export class DashbroadComponent implements OnInit {
    statistics = [];

    constructor(private userService: UsersService, private productService: ProductsService, private ordersService: OrdersService, private http: HttpClient) {}

    ngOnInit(): void {
        combineLatest([
            this.ordersService.getOrdersCount(),
            this.productService.getProductsCount(),
            this.userService.getUsersCount(),
            this.ordersService.getTotalSales()
        ]).subscribe((values) => {
            this.statistics = values;
        });
        // this.getDataFromAPI();
    }

    // apexchart

    // generateDateCategories(orderList: any[]) {
    //     const categories = [];

    //     orderList.forEach((order: any) => {
    //         const date = new Date(order.dateOrdered);
    //         const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    //         categories.push(formattedDate);
    //     });

    //     return categories;
    // }

    // getDataFromAPI() {
    //     this.http.get<any>('http://localhost:3000/api/v1/orders/').subscribe((data) => {
    //         const orderList = data;

    //         const categories: string[] = [];

    //         orderList.forEach((order: any) => {
    //             const orderDate = moment(order.dateOrdered).tz('Asia/Ho_Chi_Minh').toDate();
    //             const formattedDate = moment(orderDate).calendar('DD/MM/YYYY HH:mm');
    //             categories.push(formattedDate);
    //         });

    //         this.chartOptions.series[0].data = this.generateData(orderList, { min: 30, max: 110 }).map((dataPoint) => {
    //             const x = moment(dataPoint[0]).valueOf();
    //             return [x, dataPoint[1], dataPoint[2]];
    //         });
    //         this.chartOptions.series[1].data = this.generateData(orderList, { min: 10, max: 50 }).map((dataPoint) => {
    //             const x = moment(dataPoint[0]).valueOf();
    //             return [x, dataPoint[1], dataPoint[2]];
    //         });
    //         this.chartOptions.xaxis.categories = categories;
    //     });

    //     this.chartOptions = {
    //         series: [
    //             {
    //                 name: 'series1',
    //                 data: []
    //             },
    //             {
    //                 name: 'series2',
    //                 data: []
    //             }
    //         ],
    //         chart: {
    //             height: 350,
    //             type: 'area'
    //         },
    //         dataLabels: {
    //             enabled: false
    //         },
    //         stroke: {
    //             curve: 'smooth'
    //         },
    //         xaxis: {
    //             type: 'datetime',
    //             categories: []
    //         },
    //         tooltip: {
    //             x: {
    //                 format: 'dd/MM/yy HH:mm'
    //             }
    //         }
    //     };
    // }
}

// Chart.js

// public barChartOptions: ChartOptions = {
//     responsive: true
// };
// public barChartLabels: string[] = [];
// public barChartType = 'bar';
// public barChartLegend = true;
// public barChartData: ChartDataset[] = [{ data: [], label: 'Số lượng đơn hàng ' }];

// getDataFromAPI() {
//     this.http.get<any>('http://localhost:3000/api/v1/orders/').subscribe((data) => {
//         const orderList = data;
//         const labels: string[] = [];
//         const monthlyQuantities: number[] = [];
//         const colors: string[] = [];

//         // Tạo một đối tượng Map để lưu số lượng đơn hàng theo từng tháng
//         const ordersByMonth = new Map<string, number>();

//         // Lặp qua danh sách đơn hàng để tính tổng số lượng đơn hàng theo từng tháng
//         orderList.forEach((order: any) => {
//             const orderDate = new Date(order.dateOrdered);
//             const monthYear = format(orderDate, 'MM/yyyy');

//             if (ordersByMonth.has(monthYear)) {
//                 // Nếu đã có tháng trong Map, tăng số lượng đơn hàng lên 1
//                 ordersByMonth.set(monthYear, ordersByMonth.get(monthYear)! + 1);
//             } else {
//                 // Nếu chưa có tháng trong Map, khởi tạo số lượng đơn hàng là 1
//                 ordersByMonth.set(monthYear, 1);
//             }
//         });

//         // Lặp qua các tháng và lưu số lượng đơn hàng và màu sắc vào mảng
//         ordersByMonth.forEach((quantity, monthYear) => {
//             labels.push(monthYear);
//             monthlyQuantities.push(quantity);
//             colors.push(this.getRandomColor());
//         });

//         this.barChartLabels = labels;
//         this.barChartData[0].data = monthlyQuantities;
//         this.barChartData[0].backgroundColor = colors;
//     });
// }

// getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
// getDataFromAPI() {
//     this.http.get<any>('http://localhost:3000/api/v1/orders/').subscribe((data) => {
//         const orderList = data;
//         const labels: string[] = [];
//         const dailyQuantities: number[] = [];
//         const colors: string[] = [];

//         // Tạo một đối tượng Map để lưu số lượng đơn hàng theo từng ngày và tháng
//         const ordersByDayMonth = new Map<string, number>();

//         // Lặp qua danh sách đơn hàng để tính tổng số lượng đơn hàng theo từng ngày và tháng
//         orderList.forEach((order: any) => {
//             const orderDate = new Date(order.dateOrdered);
//             const dayMonth = format(orderDate, 'dd/MM/yyyy');

//             if (ordersByDayMonth.has(dayMonth)) {
//                 // Nếu đã có ngày và tháng trong Map, tăng số lượng đơn hàng lên 1
//                 ordersByDayMonth.set(dayMonth, ordersByDayMonth.get(dayMonth)! + 1);
//             } else {
//                 // Nếu chưa có ngày và tháng trong Map, khởi tạo số lượng đơn hàng là 1
//                 ordersByDayMonth.set(dayMonth, 1);
//             }
//         });

//         // Lặp qua các ngày và tháng và lưu số lượng đơn hàng và màu sắc vào mảng
//         ordersByDayMonth.forEach((quantity, dayMonth) => {
//             labels.push(dayMonth);
//             dailyQuantities.push(quantity);
//             colors.push(this.getRandomColor());
//         });

//         this.barChartLabels = labels;
//         this.barChartData[0].data = dailyQuantities;
//         this.barChartData[0].backgroundColor = colors;
//     });
// }

// getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// apexchart pineline
// getDataFromAPI() {
//     this.http.get<any>('http://localhost:3000/api/v1/orders/').subscribe((data) => {
//         const orderList = data;
//         const labels: string[] = [];
//         const dailyQuantities: number[] = [];
//         const colors: string[] = [];

//         // Tạo một đối tượng Map để lưu số lượng đơn hàng theo từng ngày và tháng
//         const ordersByDayMonth = new Map<string, number>();

//         // Lặp qua danh sách đơn hàng để tính tổng số lượng đơn hàng theo từng ngày và tháng
//         orderList.forEach((order: any) => {
//             const orderDate = new Date(order.dateOrdered);
//             const dayMonth = format(orderDate, 'dd/MM/yyyy');

//             if (ordersByDayMonth.has(dayMonth)) {
//                 // Nếu đã có ngày và tháng trong Map, tăng số lượng đơn hàng lên 1
//                 ordersByDayMonth.set(dayMonth, ordersByDayMonth.get(dayMonth)! + 1);
//             } else {
//                 // Nếu chưa có ngày và tháng trong Map, khởi tạo số lượng đơn hàng là 1
//                 ordersByDayMonth.set(dayMonth, 1);
//             }
//         });

//         // Lặp qua các ngày và tháng và lưu số lượng đơn hàng và màu sắc vào mảng
//         ordersByDayMonth.forEach((quantity, dayMonth) => {
//             labels.push(dayMonth);
//             dailyQuantities.push(quantity);
//             colors.push(this.getRandomColor());
//         });

//         // Tạo biểu đồ spline bằng ApexCharts
//         const chartOptions = {
//             series: [
//                 {
//                     name: 'Số lượng đơn hàng',
//                     data: dailyQuantities
//                 }
//             ],
//             chart: {
//                 type: 'line',
//                 height: 350
//             },
//             colors: colors,
//             xaxis: {
//                 categories: labels
//             }
//         };

//         const chart = new ApexCharts(document.querySelector('#chart'), chartOptions);
//         chart.render();
//     });
// }
