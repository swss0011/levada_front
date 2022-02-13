import React, { useContext, useEffect } from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  Loader,
  Dimmer,
} from 'semantic-ui-react'
import Login from './Login';
import MainView from './MainView';
import { StoreContext } from './index';
import { useObserver } from 'mobx-react';

const FixedMenuLayout = () => {
  const store = useContext(StoreContext)

  useEffect(() => {
    console.log('mount it!');
    //store.setLastUpdate(update)
    /*fetch(
      "http://localhost:8000/updated/")
      .then((res) => {
        if(!res.ok){
          console.log("ERROR")
        }
          console.log(res.status)
          return res.json()
        })
      .then((json) => {
        store.setLastUpdate(json)
      })

    fetch(
      "http://localhost:8000/category/")
      .then((res) => {
        if(!res.ok){
          console.log("ERROR")
        }
          console.log(res.status)
          return res.json()
        })
      .then((json) => {
        console.log(json)
        store.addCategories(json)
      })*/

  }, []);

    return useObserver(() =>  (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
          Levada-front
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>

        <Dropdown item simple text='Dropdown'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {store.showMain &&
        <Menu.Item position='right'>
          <Button as='a' inverted
            onClick={() => {store.openLogin()}}
          >
            Log in
          </Button>
        </Menu.Item>
        }
      </Container>
    </Menu>

    {((store.showLogin || store.showSingup) && !store.isLoading) &&
      <Login />
    }
    {(store.showMain && !store.isLoading) &&
      <MainView />
    }
    {store.isLoading &&
      <Segment  vertical style={{ margin: '8em 0em 0em', padding: '25em 0em' }}>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>

        <Image src='/images/wireframe/paragraph.png' />
      </Segment>
    }
    
      

    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>
        <Grid divided inverted stackable>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 1' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 2' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Group 3' />
            <List link inverted>
              <List.Item as='a'>Link One</List.Item>
              <List.Item as='a'>Link Two</List.Item>
              <List.Item as='a'>Link Three</List.Item>
              <List.Item as='a'>Link Four</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Footer Header' />
            <p>
              Extra space for a call to action inside the footer that could help re-engage users.
            </p>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <Image centered size='mini' src='/logo.png' />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
))
}

export default FixedMenuLayout
