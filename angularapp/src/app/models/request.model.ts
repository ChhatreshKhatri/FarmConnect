export interface Request {

    RequestId:number;

    RequestType: string;
    
    MedicineId: number;
    
    FeedId: number;
    
    UserId: number;
    
    Quantity: number;
    
    Status: string;
    
    LivestockId: number;
    
    RequestDate: string; // ISO 8601 formatted date string
    
    }