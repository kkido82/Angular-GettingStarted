import { ProductService } from './product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Products List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMsg: string;

    private _listFilter: string;
    public get listFilter() {
        return this._listFilter;
    }
    public set listFilter(value) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) { }

    onNotify(message: string): void {
        this.pageTitle = `Selected rating is ${message}`;
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterTerm: string): IProduct[] {
        filterTerm = filterTerm.toLocaleLowerCase();

        return this.products
            .filter((p: IProduct) => p.productName.toLocaleLowerCase().includes(filterTerm));

    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            err => this.errorMsg = <any>err
        );
    }
}
