//import { test } from 'jest';
/* import 'jest'; */

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
    dMsg: string;
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
        d: { dMsg: "", stateVersion: 0 }
    });
    appState1.addTransformation("t1", ["a", "b"], ["c"], (stateTransformator, state) => {
        const { a, b } = state;
        const result: TAppState1C = {
            c: a.a1 + a.a2 + b.b1 + b.b2,
            stateVersion: 0
        };
        stateTransformator.setResult({ c: result });
    });
    appState1.addTransformation("t1", ["a", "c"], ["d"], (stateTransformator, state) => {
        const { a, c } = state;
        const result: TAppState1D = {
            dMsg: `a1:${a.a1}; a2:${a.a2}; c:${c.c};`,
            stateVersion: 0
        };
        stateTransformator.setResult({ d: result });
    });
    appState1.buildTransformatorOrder();
    appState1.process();
    expect(2 + 2).toBe(4);
});