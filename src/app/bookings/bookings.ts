export interface IBookings {
    eventBookingId: number;
    customerName: string;
    mobileNumber: string;
    venueId: number;
    venueName: string;
    eventDateTime: Date;
    bookedHours: number;
}