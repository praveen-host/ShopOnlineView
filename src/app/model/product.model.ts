import {ProductImageModule } from './product-image.module';

export interface ProductModel{
    productCode: string,
    brand:string,
    category:string,
    skuName:string,
    shortDescription:string,
    longDescription:string,
    hsnCode:string,
    status:string,
    createdAt:Date,
    updatedAt:Date,
    uomSymbol:string
    prodcutImages:ProductImageModule[]
}