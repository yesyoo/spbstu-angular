export interface ITour {
    name: string,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    type?: string,
    date?: string,
    id: string,
    _id: string,
    country: string,
    city: string
}

export type TourType = 'Одиночный' | 'Групповой';

export interface ITourTypeSelect {
    label?: string,
    value?: string,
    date?: string
}

export interface INearestTour extends ITour {
    locationId: string
};

export interface ITourLocation {
    name: string,
    id: string
};
export interface ITourTest extends INearestTour { 
    region?: any
}
