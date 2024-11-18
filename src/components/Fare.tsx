import Station from './Station';

interface Leg {
    legId: string;
    rsid: string;
    origin: Station;
    destination: Station;
    type: string;
    mode: string;
    durationInMinutes: number;
    departureDateTime: Date;
    arrivalDateTime: Date;
    status: string;
    trainOperator: { code: string; name: string };
    trainFacilities: { name: string; code: string }[];
    additionalFacilitiesInformation: string;
    isAzuma: boolean;
    firstClassDiningOption: string;
    firstClassDiningOptionDetails: { name: string; description: string | null };
    iptisTripIdentifier: string;
}

interface PricingBreakdown {
    passenger: string;
    passengerStatus: string;
    ticketCount: number;
    costInPennies: number;
}

interface PricingItem {
    subTotalInPennies: number;
    breakdown: PricingBreakdown[];
}

interface Ticket {
    fareId: string;
    fareSignature: string;
    fareOriginLocationName: string;
    fareDestinationLocationName: string;
    fareSource: string;
    ftot: string;
    ticketOptionToken: string;
    ticketType: string;
    ticketClass: string;
    ticketCategory: string;
    name: string;
    description: string;
    priceInPennies: number;
    pricingItem: PricingItem;
    numberOfTickets: number;
    quotaControlled: string;
    isValidForLoyaltyCredit: boolean;
    isValidForAdr: boolean;
    outboundValidity: string;
    inboundValidity: string;
    isFlexiAdvanceProduct: boolean;
    originFlexWindowSize: number;
    isCheapestTicket: boolean;
    routeRestriction: { restrictionCode: string; restrictionDisplayName: string; restrictionPrintingName: string };
}

export interface Journey {
    journeyOptionToken: string;
    journeyId: string;
    originStation: Station;
    destinationStation: Station;
    departureTime: string;
    arrivalTime: string;
    status: string;
    primaryTrainOperator: { code: string; name: string };
    legs: Leg[];
    tickets: Ticket[];
    journeyDurationInMinutes: number;
    isFastestJourney: boolean;
    isOvertaken: boolean;
    bulletins: string[];
    stationMessages: string[];
    isEligibleForLoyalty: boolean;
}

export interface Fare {
    numberOfAdults: number;
    numberOfChildren: number;
    outboundJourneys: Journey[];
    nextOutboundQuery: string;
    previousOutboundQuery: string;
    nextDayOutboundQuery: string;
    previousDayOutboundQuery: string;
    bookingMessages: { messageCentreTitle: string; doNotShowAgainText: string; messages: string[] };
    isSemiFlexibleRoute: boolean;
}