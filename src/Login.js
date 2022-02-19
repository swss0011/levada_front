import React, { useContext } from 'react'
import { Button, Form, Grid, Header, Divider, Message, Segment } from 'semantic-ui-react'
import { StoreContext } from './index';
import { useObserver } from 'mobx-react';
import MessageError from './MessageError';

const LoginForm = () => {
    const store = useContext(StoreContext)

    var state = {email: '', password: '', password2: ''}

    const handleChange = (e, { name, value }) => state[name] = value 

    function getMainText() {
        if (store.showLogin){
            return 'Log In'
        }
        else{
            return 'Sign Up'
        }
    }

    function getSecondText() {
        if (store.showLogin){
            return 'New to us? - Sign Up'
        }
        else{
            return 'Back to Login'
        }
    }

    const singUp = (_user, _pass, _pass2) => {
      (async () => {
        const rawResponse = await fetch('http://185.139.68.97/route/user/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'username': _user,
            "email": _user,
            'password': _pass,
            'second_password': _pass2
          })
        });
        const res = await rawResponse
        if(!res.ok){
          res.text().then(text => {
            console.log(text)
            var jsObj = JSON.parse(text)
            store.setErrorMsg(jsObj['detail'])
            store.showError(true)
          })
          
        }
        else{
          const content = await rawResponse.json();
          console.log(content);
          console.log(content['access_token'])
          store.setToken(content['access_token'])
        }
        
      
        
      })();
    }

    const logIn = (_user, _pass) => {
      var details = {
        'username': _user,
        'password': _pass,
        'grant_type': 'password'
      };
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      fetch('http://185.139.68.97/route/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then(res => {
        if(!res.ok){
          console.log(res.statusText)
          store.setErrorMsg(res.statusText)
          store.showError(true)
        }

        return res.json()
      }).then((json) => {
        console.log(json['access_token'], json['verified'])
        store.setToken(json['access_token'])
        store.setVerified(json['verified'])
      });
    }

    const proceedLoginOrSingup = () => {
      //access_token
      console.log('--------')
      console.log(state)
      if(store.showSingup){
        singUp(state.email, state.password, state.password2)
      }
      else{
        logIn(state.email, state.password);
      }
      
    }


    return useObserver(() => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      {store.hasError &&
        <MessageError />
      }
      <Header as='h2' color='teal' textAlign='center'>
         {getMainText()} to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input
            name='email' 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='E-mail address'
            onChange={handleChange}
           />
          <Form.Input
            name='password'
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={handleChange}
          />
          {store.showSingup &&
          <Form.Input
            name='password2'
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
            onChange={handleChange}
          />
          }

          <Button color='teal' fluid size='large' onClick={() => {proceedLoginOrSingup()}}>
           {getMainText()}
          </Button>
          <Divider horizontal></Divider>
          <Button basic color='red' fluid size='large' onClick={() => {store.closeLogin()}}>
           Cancel
          </Button>
        </Segment>
      </Form>
      <Message>
         <a onClick={() => store.flipSingUpLogin()}>{getSecondText()}</a>
      </Message>
    </Grid.Column>
  </Grid>
))}

export default LoginForm
