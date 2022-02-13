import React, { useContext } from 'react'
import { Button, Form, Grid, Header, Divider, Message, Segment } from 'semantic-ui-react'
import { StoreContext } from './index';
import { useObserver } from 'mobx-react';

const LoginForm = () => {
    const store = useContext(StoreContext)

    

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


    return useObserver(() => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
         {getMainText()} to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          {store.showSingup &&
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm Password'
            type='password'
          />
          }

          <Button color='teal' fluid size='large' onClick={() => {store.closeLogin()}}>
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