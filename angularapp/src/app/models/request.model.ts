export interface Request {
    RequestId: number;
    RequestType: string;
    MedicineId: number | null;
    FeedId: number | null;
    UserId: number;
    Quantity: number;
    Status: string;
    LivestockId: number;
    RequestDate: string;
}