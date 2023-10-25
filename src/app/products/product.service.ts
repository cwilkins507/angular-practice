import {Injectable} from "@angular/core";
import {Product} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, catchError, tap, throwError} from "rxjs";

//root application injector if the service is used throughout app
//specific component injector if only that component uses the service
//providedIn lets you map to the components and its children in THAT providers
@Injectable({
  providedIn: 'root'
})

//service class has a clear name, pascal casing, appending service, with export
//use injectable decorator
export class ProductService {


  private productURL = 'api/products/products.json';

  //define a dependency for the http Client Service in the constructor
  constructor(private http: HttpClient) {
  }

//return an observable of the generic type product array, requires a subscriber to work
  //set up exception handling (tap/catch)
  //create a method for each HTTP request, call the desired HTTP method (such as get)
  //right now we just have a get, can put methods to post/put data
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL).pipe(
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    //in a real world app, we may send the server to some remote logging infrastructure
    //instead of just logging it to the console
    let errorMessage = '';
    if(err.error instanceof ErrorEvent) {
      //A client-side or network error occurred, handle it accordingly.
      errorMessage = `An error occurred: ${errorMessage}`;
    } else {
      //the backend returned an unsuccessful response code.
      //the response body may contain clues as to what went wrong
      errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(()=> errorMessage);
  }
}
