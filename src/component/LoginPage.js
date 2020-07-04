import React, {useState} from 'react';
import {connect} from "react-redux";
import {login} from "../action/UserAction";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import {Container} from "@material-ui/core";


const LoginPage = ({logon, user, error}) => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        submitted: false,
        showPassword: false
    });

    const handleChange = (e) => {
      const {name, value} = e.target;
      setForm(prev => ({
          ...prev,
          [name]:value
      }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setForm(prev => ({
            ...prev,
            submitted: true
        }));
        const {username, password} = form;
        if(username && password){
            logon(username, password);
        }
    };

    const handleClickShowPassword = (e) => {
        setForm(prev => ({
            ...prev,
            showPassword: !form.showPassword
        }));
    };

    const handleMouseDownPassword =  (e) => {
        e.preventDefault();
    };

    return (

        <Container maxWidth="lg">
            <Box  display="flex" justifyContent="center" style={{paddingTop: 50}}>
                <Card style={{padding:50}}>
                    <form onSubmit={handleSubmit}>
                    <CardContent>
                        <FormControl style={{width:'100%'}} required={true} error={!!error}>
                            <InputLabel htmlFor="standard-adornment-amount">Username</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </CardContent>
                    <CardContent>
                        <FormControl style={{width:'100%'}} required={true} error={!!error}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={form.showPassword ? 'text' : 'password'}
                                value={form.password}
                                name="password"
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {form.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </CardContent>
                    <CardContent>
                        <Button variant="contained" color="primary"  type="submit">
                            Login
                        </Button>
                        {error ? <p style={{color: "red"}}>Username and password are incorrect</p> : ""}
                    </CardContent>
                    </form>
                </Card>
            </Box>
        </Container>
    );
};

const mapStateToProps = (state) => {
  return {
    user: state.UserReducer.user,
    error: state.UserReducer.error
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logon: (username, password) => dispatch(login(username, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage);