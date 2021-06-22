export interface SalesOrderDetailsModel{
    id:number,
    orderId:number,
    productCode:string,
    skuName:string,
    uomSymbol:string,
    priceId: number,
    mrp:number,
    price:number,
    percentageDiscount:number,
    discountAmount:number,
    orderedQty:number,
    despatchedQty:number,
    acceptedQty:number,
    value:number,
    status:number,
    createdAt:Date,
    updatedAt:Date
}

