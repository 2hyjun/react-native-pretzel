import React from 'react';

import { TabRouter } from 'react-navigation';

import meanless1 from './meanless1'
import meanless2 from './meanless2'

const MainRoute = TabRouter({
    main1: {
        screen: meanless1,
    },
    main2: {
        screen: meanless2,
    }
});

export default class meanless3 extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            active: props.value.active,
        };
    }

    //this method will not get called first time
    componentWillReceiveProps(newProps){
        this.setState({
            active: newProps.value.active,
        });
    }

    render() {
        const Component = MainRoute.getComponentForRouteName(this.state.active)
        return <Component/>
    }

}