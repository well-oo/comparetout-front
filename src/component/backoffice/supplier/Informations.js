import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {updatePassword} from "../../../action/UserAction";
import {resetErrorAndSuccess} from "../../../action/UserAction";




const Informations = ({update, user, error, success, reset}) => {
    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        verifyPassword: "",
        submitted: false
    });

    useEffect(()=> {
       return () => {
            reset();
       }
    }, [reset]);

    useEffect(() => {
            setForm(prev => ({
                ...prev,
                oldPassword: "",
                newPassword: "",
                verifyPassword: "",
            }));
    }, [success]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setForm(prev => ({
            ...prev,
            submitted: true
        }));
        const {oldPassword, newPassword, verifyPassword} = form;
        if(oldPassword && newPassword && verifyPassword){
            update(oldPassword, newPassword, verifyPassword);
            setForm(prev => ({
                ...prev,
                submitted: false
            }));
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]:value
        }));
    };

    return (<Grid container spacing={3} style={{paddingLeft:25}}>
            <Typography variant="h4" gutterBottom>Information générales</Typography>
            <Grid item xs={12}>
                <TextField
                    required
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    InputProps={{readOnly: true}}
                    defaultValue={user.email}
                    style={{width:"60%"}}
                />
            </Grid>
            <form onSubmit={handleSubmit} style={{width: "100%", padding: "12px"}}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Ancien mot de passe"
                        margin="normal"
                        variant="outlined"
                        type={form.showOldPassword ? 'text' : 'password'}
                        value={form.oldPassword}
                        name="oldPassword"
                        error={!!error}
                        onChange={handleChange}
                        style={{width:"60%"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Nouveau mot de passe"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={form.newPassword}
                        name="newPassword"
                        error={!!error}
                        onChange={handleChange}
                        style={{width:"60%"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Répeter nouveau mot de passe"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        value={form.verifyPassword}
                        name="verifyPassword"
                        error={!!error}
                        onChange={handleChange}
                        style={{width:"60%"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Modifier</Button>
                    {error ? <p style={{color: "red"}}>Veuillez vérifier les champs de votre formulaire !</p> : ""}
                    {success ? <p style={{color: "green"}}>Votre mot de passe a été changé avec succès !</p> : ""}
                </Grid>
            </form>
        </Grid>
    )
};

const mapStateToProps = state => {
    return {
        user: state.UserReducer.user,
        error: state.UserReducer.error,
        success: state.UserReducer.success
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (oldPassword, newPassword, verifyPassword) => dispatch(updatePassword(oldPassword, newPassword, verifyPassword)),
        reset : () => dispatch(resetErrorAndSuccess())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Informations);