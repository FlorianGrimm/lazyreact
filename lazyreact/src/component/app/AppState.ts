import { StateRoot } from "../../lazyreact";
type TStateRoot={

}
export class AppState extends StateRoot<TStateRoot> {
    constructor(initalState:TStateRoot){
        super(initalState);        
    }
}