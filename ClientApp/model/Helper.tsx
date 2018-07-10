export function getFullName(artist: any): string {
    let firstName = artist.firstName ? artist.firstName + ' ' : '';
    let middleName = artist.middleName ? artist.middleName + ' ' : '';
    let lastName = artist.lastName ? artist.lastName : '';
    return firstName + middleName + lastName;
}