import { v4 as uuidv4 } from 'uuid';

export class Todo {
    public id : string;
    public text : string;
    public completed : boolean;

    constructor(text : string){
        this.text = text;
        this.id = uuidv4();
        this.completed = false;
    }
}