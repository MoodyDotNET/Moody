import Song from "./Song";

export default interface Album {
    albumName: string;
    dateReleased: Date;
    genre: string;
    coverLink: string;
    albumId: number;
    song: Song[];
}