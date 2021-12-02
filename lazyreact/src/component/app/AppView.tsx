import React from 'react';
/*
import { AppViewModel } from './AppViewModel';
import GridView from '../grid/GridView';
import { getRenderCount } from '../../renderCount';
import { ComponentViewProps, ViewProps } from '../../models/ViewProps';

export type AppProps = ComponentViewProps<AppViewModel>;
export type AppState = {
    stateVersion:number
}
*/
export type AppProps = {
}
export type AppState = {
}
export default class AppView extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            //stateVersion: props.stateVersion
        };
        //props.getRefreshUI((stateVersion:number)=>this.setState({stateVersion:stateVersion}), ()=>this.state.stateVersion);
    }
    render(): React.ReactNode {
        /*
        const cnt=getRenderCount("App");
        const viewModel = this.props.getViewModel();
        
        return (
            <>
                <div>
                    AppView @{cnt}
                </div>
                {
                    React.createElement(GridView, viewModel.gridViewModel.getProps())
                }
            </>
        );
        */
        return (
            <>
                <div>
                    AppView
                </div>
            </>
        );
    }
}