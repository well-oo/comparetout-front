import React from 'react';
import {logout} from "../action/UserAction";
import {connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {emptyMenu} from "../action/BackOfficeAction";
import {useHistory} from "react-router-dom";



const Header = ({token, disconnect, emptyMenu}) => {

    const handleOnClick = (e) => {
        disconnect();
        emptyMenu();
    };

    const history = useHistory();

    return <nav style={{paddingBottom:100}}>
        <AppBar className="positionSticky">
            <Toolbar>
                <Grid
                    justify="space-between"
                    container
                >
                    <Grid item>
                        <Button color="inherit">
                            <Typography variant="h5" onClick={() => history.push("/")}>
                                CompareTout
                            </Typography>
                        </Button>
                    </Grid>
                    {(token || localStorage.getItem("token"))&& (
                        <Grid item>
                            <Button color="inherit" onClick={handleOnClick}>
                                Disconnect
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    </nav>
};

const mapStateToProps = (state) => {
    return {
        token : state.UserReducer.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        disconnect: () => dispatch(logout()),
        emptyMenu: () => dispatch(emptyMenu())
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Header);