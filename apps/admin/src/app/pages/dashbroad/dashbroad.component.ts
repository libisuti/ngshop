import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';
import { combineLatest } from 'rxjs';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';

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
        this.getDataFromAPI();
    }
    // Chart.js

    public barChartOptions: ChartOptions = {
        responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData: ChartDataset[] = [{ data: [], label: 'Số lượng đơn hàng ' }];

    getDataFromAPI() {
        this.http.get<any>('http://localhost:3000/api/v1/orders/').subscribe((data) => {
            const orderList = data;
            const labels: string[] = [];
            const monthlyQuantities: number[] = [];

            // Tạo một đối tượng Map để lưu số lượng đơn hàng theo từng tháng
            const ordersByMonth = new Map<string, number>();

            // Lặp qua danh sách đơn hàng để tính tổng số lượng đơn hàng theo từng tháng
            orderList.forEach((order: any) => {
                const orderDate = new Date(order.dateOrdered);
                const monthYear = format(orderDate, 'MM/yyyy');

                if (ordersByMonth.has(monthYear)) {
                    // Nếu đã có tháng trong Map, tăng số lượng đơn hàng lên 1
                    ordersByMonth.set(monthYear, ordersByMonth.get(monthYear)! + 1);
                } else {
                    // Nếu chưa có tháng trong Map, khởi tạo số lượng đơn hàng là 1
                    ordersByMonth.set(monthYear, 1);
                }
            });

            // Lặp qua các tháng và lưu số lượng đơn hàng vào mảng
            ordersByMonth.forEach((quantity, monthYear) => {
                labels.push(monthYear);
                monthlyQuantities.push(quantity);
            });

            this.barChartLabels = labels;
            this.barChartData[0].data = monthlyQuantities;
        });
    }
}
