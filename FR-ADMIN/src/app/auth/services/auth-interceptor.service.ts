import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable({
	providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
	constructor(private router: Router) {}

	// intercept(req: HttpRequest<any>, next: HttpHandler) {
	// 	let username = sessionStorage.getItem("username");
	// 	let authKey = sessionStorage.getItem("basicauth");

	// 	if (username && authKey) {
	// 		req = req.clone({
	// 			headers: req.headers.set("Authorization", "Basic " + authKey),
	// 		});
	// 		console.warn("INTEEEEEEEEEEEEEEEEEERCEPTOR");
	// 	}

	// 	return next.handle(req);
	// }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let authKey = sessionStorage.getItem("basicauth");
		if (authKey) {
			console.error("ADDING AUTHKEY");
			request = request.clone({
				headers: request.headers.set(
					"Authorization",
					"Basic " + authKey
				),
			});
		}

		return next.handle(request).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						console.log("GOOD INTERCEPTOR");
					}
				},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
						if (err.status === 401) {
							console.warn("Interceptor BAAAAAD");
							this.router.navigate(["login"]);
						}
					}
				}
			)
		);
	}
}
