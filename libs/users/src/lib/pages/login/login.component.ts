import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { Location } from '@angular/common';
import { User } from '../../models/user';
@Component({
    selector: 'bluebits-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
    // encapsulation: ViewEncapsulation.None // Tắt CSS encapsulation
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email or Password are wrong';
    signupFormGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        private localstrorageService: LocalstorageService,
        private router: Router,
        private usersService: UsersService,
        private location: Location
    ) {}
    ngOnInit(): void {
        this._initLoginForm();
        this._initSignupForm();
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    private _initSignupForm() {
        this.signupFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    @ViewChild('container')
    container!: ElementRef;

    signIn() {
        this.container.nativeElement.classList.remove('right-panel-active');
    }

    signUp() {
        this.container.nativeElement.classList.add('right-panel-active');
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }
    get signupForm() {
        return this.signupFormGroup.controls;
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginFormGroup.invalid) return;

        this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
            (user) => {
                this.authError = false;
                this.localstrorageService.setToken(user.token as string);
                this.router.navigate(['/']);
            },
            (error: HttpErrorResponse) => {
                this.authError = true;
                if (error.status !== 400) {
                    this.authMessage = 'Error in the Server ,  please try again later!';
                }
            }
        );
    }
    Signup() {
        // Kiểm tra xem biểu mẫu đăng ký có hợp lệ không
        if (this.signupFormGroup.invalid) {
            return; // Nếu không hợp lệ, không tiếp tục thực hiện đăng ký
        }

        // Lấy các giá trị từ biểu mẫu đăng ký
        const name = this.signupForm.name.value;
        const email = this.signupForm.email.value;
        const password = this.signupForm.password.value;

        // Tạo đối tượng User từ các giá trị thu thập được
        const user: User = {
            name: name,
            email: email,
            password: password
        };

        // Gọi API để tạo người dùng thông qua dịch vụ usersService
        this.usersService.createUser(user).subscribe(
            (response) => {
                // Xử lý phản hồi thành công từ API ở đây (nếu cần)
                // Ví dụ: hiển thị thông báo đăng ký thành công
                console.log('Đăng ký thành công!', response);

                // Sau khi đăng ký thành công, bạn có thể thực hiện các hành động bổ sung ở đây
                // Ví dụ: đăng nhập người dùng tự động sau khi đăng ký

                // Điều hướng người dùng đến trang đăng nhập hoặc trang khác (tuỳ ứng dụng của bạn)
                this.router.navigate(['/']); // Ví dụ: điều hướng đến trang đăng nhập
            },
            (error) => {
                // Xử lý lỗi từ API ở đây và hiển thị thông báo lỗi cho người dùng (nếu cần)
                console.error('Lỗi đăng ký:', error);

                // Ví dụ: hiển thị thông báo lỗi cho người dùng
                this.showErrorMessage('Đăng ký không thành công. Vui lòng thử lại sau.');
            }
        );
    }

    // Hàm này có thể thêm vào để hiển thị thông báo lỗi
    showErrorMessage(message: string) {
        // Hiển thị thông báo lỗi cho người dùng (tuỳ ứng dụng của bạn)
        // Ví dụ: bạn có thể sử dụng một thành phần thông báo hoặc cửa sổ pop-up
        // Đảm bảo triển khai hàm này dựa trên UI của ứng dụng của bạn.
        alert(message);
    }
}
