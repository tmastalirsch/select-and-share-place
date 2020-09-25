import { MapComponent } from './MapComponentn';
import axios from 'axios'; 
import { GoogleGeocodingResponse } from '../types/GoogleGeocodingResponse';
import { InputComponent } from './InputComponent';


const GOOGLE_API_KEY = 'AIzaSyCzO-7pLO1JtedGCPcTQxsPZKyQgsPxjkM';

export class FormComponent {

    private formElement: HTMLFormElement;
    private addressComponent: InputComponent
    private mapComponent: MapComponent;


    constructor()
    {   
        this.formElement = document.querySelector('form')!;
        this.addressComponent = new InputComponent('address');
        this.mapComponent = new MapComponent('map');
    }

    /**
     * 
     */
    public handle(): this
    {
        this.formElement.addEventListener('submit', this.submitHandler.bind(this))
        return this;
    }

    private submitHandler(event: Event)
    {   
        event.preventDefault();
        const inputValue = this.addressComponent.getValue();
        const address = encodeURI(inputValue);

        this.getHttpGetRequest({
            address: address,
            key: GOOGLE_API_KEY, 
        });
        
    }


    private getHttpGetRequest(params: object)
    {   
        const URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

        /** build http query */
        const httpURLQuery = Object
        .entries(params)
        .reduce((str, [key, value]) => {
            str += `&${key}=${value}`;
            return str;
        }, '');

        axios.get<GoogleGeocodingResponse>(URL + httpURLQuery)
        .then((response) => {

            if( response.data.status === 'ZERO_RESULTS' ){
                throw new Error ('Could not found google location');
            } else if (response.data.status !== 'OK') {
                throw new Error('Could not fetch google location');
            } else {
                const coordinates = response.data.results[0].geometry.location;
                // const [lat, lng] = coordinates;
                this.mapComponent.displayCoordinates(coordinates, true);
            }
        })
        .catch((error) =>{
            alert(error.message);
            console.log(error);
        });
    }


}