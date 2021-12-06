import { StateRoot } from "../../lazyreact";
import { AppViewModel } from "./AppViewModel";

type TStateRoot = {
    appViewModel:AppViewModel;
}

export class AppState extends StateRoot<TStateRoot> {
    constructor(initalState: TStateRoot) {
        super(initalState);
    }
}
export function initialAppState():AppState{
    const result = new AppState({
        appViewModel:new AppViewModel()
    });
    return result;
}