import React from "react";
import Grid from "@material-ui/core/Grid";
import Chart from "react-apexcharts";

const Statistiques = () => {
    const [state] = React.useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    });
    return(
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Chart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    width="500"
                />
            </Grid>
            <Grid item xs={6}>
                <Chart
                    options={{}}
                    series={[44, 55, 41, 17, 15]}
                    type="donut"
                    width="380"
                />
            </Grid>
        </Grid>
    )
};

export default Statistiques;