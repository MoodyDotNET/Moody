import Song from "./Song";

export default interface Album {
    album1: string;
    dateReleased: Date;
    genre: string;
    coverLink: string;
    albumId: number;
    song: Song[];
}