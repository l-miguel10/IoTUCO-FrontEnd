import React from 'react'
import { FormGroup, FormControl, FormText, FormCheck, } from "react-bootstrap";
import '../components/styles/StylesWelcome.css'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import '../components/styles/StylesWelcome.css'
import Grid from '@material-ui/core/Grid'
import { Redirect } from 'react-router-dom'
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button'
import location from 'react-location'

class PageNew extends React.Component {

    state = { email: '', password: '' }
    onChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onChangePass = (event) => {
        this.setState({ password: event.target.value })
    }

    Upload = () => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("email", this.state.email);
        urlencoded.append("password", this.state.password);

        var requestOptions = {
            method: 'POST',
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://iooost-8a231f20.localhost.run/api/login", requestOptions)
            //.then(response => response.text())
            .then(result => {
                console.log(result.ok)
                console.log(result)
                if (result.ok === true) {
                    this.setState({ login: true })
                }
            })
            .catch(error => console.log('error', error))
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        
      
        if (!this.state.login) {
            return (

                <div className="container" >
                    <Container maxWidth="sm">
                        <Box my={4}>
                            <Typography variant="h2" color="textSecondary" align="center">
                                Green House IoT
            </Typography>
                        </Box>
                        <Box my={4} className='avatar' >
                            <LockIcon style={{ fontSize: 60 }} />
                        </Box>

                    </Container>
                    <Grid container justify="center">
                        <form>

                            <FormGroup controlId="formBasicEmail" >
                                <FormControl value={this.state.email} onChange={this.onChange} type="email" placeholder="Enter email" style={{ width: "370px" }} />
                                <FormText className="text-muted">
                                    We'll never share your email with anyone else.
                            </FormText>
                            </FormGroup>
                            <FormGroup controlId="formBasicPassword" >
                                <FormControl value={this.state.password} onChange={this.onChangePass} type="password" placeholder="Password" style={{ width: "370px" }} />
                            </FormGroup>
                            <FormGroup controlId="formBasicCheckbox">
                                <FormCheck type="checkbox" label="Check me out" />
                            </FormGroup>
                            
                            <Button onClick={this.Upload} variant = 'contained' color = 'primary' style={{width: "370px"}} >Entrar</Button>
                        </form>
                    </Grid>
                </div>

            )
        }
       
        else {
            if(document.referrer == 'http://localhost:3000/welcome'){
                location.href = 'error.php';
            return ( 
            <Redirect to="/welcome"></Redirect>)
        }}
    }
    }


export default PageNew