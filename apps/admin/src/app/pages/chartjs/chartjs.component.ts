import { Component, OnInit } from '@angular/core';

import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';

@Component({
    selector: 'admin-chartjs',
    templateUrl: './chartjs-component.html'
})
export class ChartjsComponent implements OnInit {
    constructor(private http: HttpClient) {}
    ngOnInit(): void {
        this.getDataFromAPI();
    }

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
            const colors: string[] = [];

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

            // Lặp qua các tháng và lưu số lượng đơn hàng và màu sắc vào mảng
            ordersByMonth.forEach((quantity, monthYear) => {
                labels.push(monthYear);
                monthlyQuantities.push(quantity);
                colors.push(this.getRandomColor());
            });

            this.barChartLabels = labels;
            this.barChartData[0].data = monthlyQuantities;
            this.barChartData[0].backgroundColor = colors;
        });
    }

    getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
