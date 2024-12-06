class Station{
    uuid: string;
    name: string;
    iconUrl: string;
    url: string;

    constructor(uuid: string, name: string, iconUrl: string, url: string){
        this.uuid = uuid;
        this.name = name;
        this.iconUrl = iconUrl;
        this.url = url;
    }
}
export default Station;