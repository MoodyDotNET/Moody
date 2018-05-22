import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Paper, Card, List, ListItem, CardActions, RaisedButton } from 'material-ui';

interface CounterState {
    currentCount: number;
}

export class Counter extends React.Component<RouteComponentProps<{}>, CounterState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { currentCount: 0 };
    }

    public render() {
        return (
            <Card style={{padding: "50px"}}>
                <h1>Counter</h1>
                <span>Current count: <strong>{ this.state.currentCount }</strong></span>
                <br/>
                <RaisedButton style={{marginTop: "10px"}} onClick={() => { this.incrementCounter() }}>Increment</RaisedButton>
            </Card>
        );
    }

    incrementCounter() {
        this.setState({
            currentCount: this.state.currentCount + 1
        });
    }
}
