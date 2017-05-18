// @flow

export type RoundPoint = {
    Id: number,
    Coords: {
        Lat: number,
        Long: number
    },
    Name: string,
    Visited: boolean
    Estimation: Date
    Address: string
}

export type RoundResponse = {
    Points: [RoundPoint]
}

export type MeetDriverResponse = {
    Eta: Date,
    Point: RoundPoint
}