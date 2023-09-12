export interface IPhoto {
    albumId: number,
    id: number | undefined,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface IAction {
    type: string;
    payload: any;
}