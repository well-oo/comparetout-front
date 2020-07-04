import React from 'react';
import {Redirect, Route} from "react-router-dom";

const PrivateRoute = ({children, ...rest}) => {
    let token = localStorage.getItem("token");
    return(
        <Route
            {...rest}
            render={({ location }) =>
                token !== null ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};


export default PrivateRoute;