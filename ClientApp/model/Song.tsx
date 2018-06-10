import Album from "./Album";
import Artist from "./Artist";
import Administrator from "./Administrator";
import Category from "./Category";
import Tag from "./Tag";

export default interface Song {
    songCode: number;
    title: string;
    subtitle: string;
    rating: number;
    listeningFrequency: number;
    contributingArtist: number;
    albumId: number;
    dateReleased: Date;
    lastModifyAt: Date;
    lastModifyBy: number;
    composer: number;
    lyricCode: string;
    coverLink: string;
    available: boolean;
    length: number;

    album: Album;
    composerNavigation: Artist;
    contributingArtistNavigation: Artist;
    lastModifyByNavigation: Administrator;
    tag: Tag[];
}