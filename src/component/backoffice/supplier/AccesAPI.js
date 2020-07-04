import React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import {connect} from "react-redux";
import {getSwaggerDocs} from "../../../action/SwaggerAction";

const AccesAPI = ({swaggerDocs, getSwaggerDocs, user}) => {

    if(swaggerDocs === null){
        getSwaggerDocs();
    }

    return <Grid container spacing={3} style={{paddingLeft:25}}>
        <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>Documentation API</Typography>
        </Grid>
        <Grid item xs={12}>
            <TextField
                label="Token API"
                margin="normal"
                variant="outlined"
                defaultValue={user.apiKey}
                InputProps={{
                    readOnly: true,
                }}
                style={{width:"90%"}}
            />
        </Grid>
        <Grid item xs={12}>
            <Typography variant="overline" display="block" gutterBottom>
                {swaggerDocs === null ? <div>Chargement ...</div> : <SwaggerUI spec={swaggerDocs} />}
            </Typography>
        </Grid>
    </Grid>
};

const mapStateToProps = state => {
    return {
        swaggerDocs : state.SwaggerDocsReducer.docs,
        user: state.UserReducer.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSwaggerDocs : () => dispatch(getSwaggerDocs())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AccesAPI);