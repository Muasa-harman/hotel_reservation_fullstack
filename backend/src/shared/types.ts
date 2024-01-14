export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country:string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string;
    pricePerNight: Number;
    starRating: number;
    imageUrls: string[]
    lastUpdated: Date;
}