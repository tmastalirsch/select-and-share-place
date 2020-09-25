
export class InputComponent {

    private inputElement: HTMLInputElement;

    constructor(id: string, _css?: String[])
    {   
        this.inputElement = document.getElementById(id)! as HTMLInputElement;
    }


    getValue(): string
    {
        return this.inputElement.value;
    }
}