//import { test } from 'jest';
import 'jest';
import { 
    deepEquals
} from '../../lazyreact/deepEquals';

import {
    StateRoot
} from '../../lazyreact/StateRoot';

type TAppState1 = {
    a: TAppState1A,
    b: TAppState1B,
    c: TAppState1C,
    d: TAppState1D,
}

type TAppState1A = {
    a1: number;
    a2: number;
    stateVersion: number;
}
type TAppState1B = {
    b1: number;
    b2: number;
    stateVersion: number;
}
type TAppState1C = {
    c: number;
    stateVersion: number;
}
type TAppState1D = {
    d: string;
    stateVersion: number;
}
class AppState1 extends StateRoot<TAppState1>{
    constructor(initalState?: TAppState1) {
        super(initalState);
    }
}

test('AppState1', () => {
    const appState1 = new AppState1({
        a: { a1: 1, a2: 2, stateVersion: 0 },
        b: { b1: 3, b2: 4, stateVersion: 0 },
        c: { c: 0, stateVersion: 0 },
        d: { d: "", stateVersion: 0 }
    });
    appState1.addTransformation1("a", "c", (that, oldResult, a) => {
        const result: TAppState1C = { 
            c: 0, 
            stateVersion:0 
        };
        that.setResult(result);
        /*
            return { changed: (deepEquals(oldD, result)), result: result };
        */
    });
    expect(2 + 2).toBe(4);
});