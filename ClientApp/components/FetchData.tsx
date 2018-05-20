import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Table, TableHeader, TableRow, TableHeaderColumn, TableBody, TableRowColumn, Paper } from 'material-ui';

interface FetchDataExampleState {
    forecasts: WeatherForecast[];
    loading: boolean;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor(props: RouteComponentProps<{}>) {
        super(props);
        this.state = { forecasts: [], loading: true };

        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return (
            <Paper style={{padding: "50px"}}>
                <h1>Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                { contents }
            </Paper>
        );
    }

    private static renderForecastsTable(forecasts: WeatherForecast[]) {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Date</TableHeaderColumn>
                        <TableHeaderColumn>Temp. (C)</TableHeaderColumn>
                        <TableHeaderColumn>Temp. (F)</TableHeaderColumn>
                        <TableHeaderColumn>Summary</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {forecasts.map(forecast =>
                    <TableRow key={ forecast.dateFormatted }>
                        <TableRowColumn>{ forecast.dateFormatted }</TableRowColumn>
                        <TableRowColumn>{ forecast.temperatureC }</TableRowColumn>
                        <TableRowColumn>{ forecast.temperatureF }</TableRowColumn>
                        <TableRowColumn>{ forecast.summary }</TableRowColumn>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        );
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
