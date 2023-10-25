import {Component, OnDestroy, OnInit} from "@angular/core";
import {Product} from "./product";
import {ProductService} from "./product.service";
import {Subscription} from "rxjs";

@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styles:[],
  styleUrls: ['./product-list.component.css'],
  // specify service here and use constructor parameter below
  providers: [ProductService]
})
//implement the OnInit and OnDestroy LifeCycle hook
export class ProductListComponent implements OnInit, OnDestroy{

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string= '';
  private _listFilter: string = '';
  sub!: Subscription;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ', value);
    this.filteredProducts = this.performFilter(value);
  }

  // set a new product array that is filled based on search value
  filteredProducts: Product[] = [];
  products: Product[] = [];

  //service is injected when component is instantiated
  constructor(private productService: ProductService) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  //sets products to that in our service, mapped through constructor
  //this.sub sets our product to the Subscription type
  //call the subscribe method of the returned observable
  // provide a function to handle the emitted item and handle any returned errors
  ngOnInit(): void {
    //store the subscription in a variable
    this.sub = this.productService.getProducts().subscribe({
      // next, error are the keys, the function is the value
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  //use the sub variable to unsubscribe post use
  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  // specifies that the page title will be replaced on event
  onRatingClicked(message: string): void {
    this.pageTitle = `Product list: ${message}`
  }

  // takes in a string, searches the products array for it, converts to lowercase,
  // and returns if included
  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:Product) =>
    product.productName.toLocaleLowerCase().includes(filterBy));
  }

}
