import Album from "./Album";
import Artist from "./Artist";
import Administrator from "./Administrator";

export default interface Song {
    SongCode: number;
    Title: string;
    Subtitle: string;
    Rating: number;
    ListeningFrequency: number;
    ContributingArtist: number;
    AlbumId: number;
    DateReleased: Date;
    LastModifyAt: Date;
    LastModifyBy: number;
    Composer: number;
    LyricCode: string;
    CoverLink: string;
    Available: boolean;
    Length: number;

    Album: Album;
    ComposerNavigation: Artist;
    ContributingArtistNavigation: Artist;
    LastModifyByNavigation: Administrator;
    // Tag: ICollection;
}