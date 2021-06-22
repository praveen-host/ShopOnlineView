import { SalesOrderDetailsModel } from "./sales-order-details.model";

export interface SalesOrder{
    firstName:string,
    lastName:string,
    orderId:string,
    orderPalcedOn:Date,
    scheduledFor:Date,
    orderStatus:string,
    orderValue:number,
    orderDetails:SalesOrderDetailsModel[]
}