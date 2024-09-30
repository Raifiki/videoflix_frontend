export class Video {
    name: string = '';
    path: string = '';
    description: string = ''
    genre: string = '';
    id: string = '';
    thumbnail: string = '';

    constructor(videoData?: any) {
        if (videoData){
            this.name = videoData.name;
            this.path = videoData.path;
            this.description = videoData.description;
            this.genre = videoData.genre;
            this.id = videoData.id;
            this.thumbnail = videoData.thumbnail;
        }
    }

    getPosterImage(): string {
        return `assets/img/logo_short.svg`;
    }
}

export class User {
    email: string = '';
    id: string = '';
    token = '';

    constructor(userData?: any) {
        if (userData){
            this.email = userData.email;    
            this.id = userData.id;          
            this.token = userData.token;
        }
    }
}