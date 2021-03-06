import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProductService } from '../../../services/product.service';

@Component({
    selector:   'so-add-feature',
    templateUrl:    './add-feature.component.html',
    styleUrls:  ['./add-feature.component.css']
})
export class AddFeatureComponent{
    @Input()productId: number;
    @Output()onAdd: EventEmitter<any> = new EventEmitter<any>();
    model: any;

    constructor(private productService: ProductService){
        this.model = {};
    }

    onSubmitFeature(){
        console.log('model - ' + this.model);
        this.model.product_id = this.productId;
        this.productService.saveProductFeature(this.model).subscribe(
            feats => {
                console.log('feats returned - ' + feats.length);
                this.onAdd.emit(null);
                this.model = {};
            },
            err => {
                console.log('error occured - ' + err);
            }
        )
    }
}