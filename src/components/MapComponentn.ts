

/**
 * @description
 * @author tmastalirsch
 */
export class MapComponent {

    private mapElement: HTMLElement;
    private googleMaps: google.maps.Map;

    constructor(id: string, _css?: String[])
    {   
        this.mapElement = document.getElementById(id)! as HTMLElement;
        this.googleMaps = new google.maps.Map(this.mapElement);
    }

    /**
     * 
     * @param coordinates 
     * @param withMarker 
     */
    public displayCoordinates(
        coordinates: { lat: number, lng: number}, 
        withMarker: boolean
    ): void
    {
        this.googleMaps.setOptions({ center: coordinates, zoom: 16 });

        if(withMarker) {
            new google.maps.Marker({position: coordinates, map: this.googleMaps});
        }
    }
    




}