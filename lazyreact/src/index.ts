import React from 'react';
import ReactDOM from 'react-dom';
import { AppState } from './component/app/AppState';
import AppView from './component/app/AppView';

/*
import { AppState } from './models/AppState';
import AppView from './component/app/AppView';
import { Project } from './models/Project';
import { globalStateVersion } from './models/GlobalStateVersion';

const appState = new AppState();
const app = React.createElement(AppView, appState.appViewModel.getProps());
globalStateVersion.incrementStateVersion();

ReactDOM.render(
    app,
    document.getElementById('app')
);
window.setTimeout(() => {
    debugger;
    const p =new Project("a");
    appState.addProject(p);
    appState.refreshUI();
    if (globalStateVersion.dirty) { globalStateVersion.incrementStateVersion(); }
}, 500);
window.setTimeout(() => {
    appState.addProject(new Project("b"));
    appState.refreshUI();
    if (globalStateVersion.dirty) { globalStateVersion.incrementStateVersion(); }
}, 1000);
*/
const appState = new AppState();
const app = React.createElement(AppView, appState.appViewModel.getProps());
ReactDOM.render(
    app,
    document.getElementById('app')
);
