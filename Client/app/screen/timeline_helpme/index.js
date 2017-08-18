import React from 'react'
import TimeLine from '../../components/Timeline';

export default class timeline_helpme extends React.Component {
    render() {
        return <TimeLine type={'helpme'}
                        onNavigate={this.props.navigation.navigate}/>;
    }
}