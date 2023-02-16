export class Image {
    
    id: number;
    imageId: number;
    path: String;
    
    constructor(id: number, imageId: number, path: String) {
        this.id = id;
        this.imageId = imageId;
        this.path = path;
    }
}
