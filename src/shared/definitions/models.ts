export class Video {
    name: string = '';
    path: string = '';
    description: string = ''
    genre: string = '';
    id: string = '';

    constructor(videoData?: any) {
        if (videoData){
            this.name = videoData.name;
            this.path = videoData.path;
            this.description = videoData.description;
            this.genre = videoData.genre;
            this.id = videoData.id;
        }
    }

    getPosterImage(): string {
        return `assets/img/logo_short.svg`;
    }
}