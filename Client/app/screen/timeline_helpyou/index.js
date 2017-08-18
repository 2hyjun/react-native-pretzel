import React from 'react'
import TimeLine from '../../components/Timeline';

export default class timeline_helpyou extends React.Component {
    render() {
        return <TimeLine type={'helpyou'}
                    onNavigate={this.props.navigation.navigate}/>;
    }
}