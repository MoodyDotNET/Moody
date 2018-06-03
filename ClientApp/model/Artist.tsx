import Administrator from "./Administrator";
import Song from "./Song";

export default interface Artist {
    artistCode: number;
    available: boolean;
    firstName: string;
    lastName: string;
    middleName: string;
    biography: string;
    birthDate: Date;
    introduce: string;
    coverLink: string;
    producerCode: number;
    lastModifyAt: Date;
    lastModifyBy: number;
    band: number;

    bandNavigation: Artist;
    lastModifyByNavigation: Administrator;
    artist: Artist;
    song: Song[];
}