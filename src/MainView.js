import React, { useContext }  from 'react'
import { Button, Container, Segment, Dropdown } from 'semantic-ui-react'
import { StoreContext } from './index';
import { useObserver } from 'mobx-react';

const MainView = () => {
    const store = useContext(StoreContext)

    function sayHello() {
        store.postCommentOnTop('comment: ')
    }

    function getOptions(){
      var options = []
      for(const item of store.categories){
        options.push({key:item.key, text: item.name, value: item.name})
      }

      return options
    }


    return useObserver(() => (
        
        <Container text style={{ margin: '5em 0em 0em'}}>
        <Segment>
          <Dropdown placeholder='Categories' fluid multiple selection options={getOptions()} />
        </Segment>
        <Button onClick={sayHello}>Click Here</Button>
        <>
          {
            store.comments.map((comment, index) => {
              return (
                <p key={index}>
                  {comment}
                </p>
              )
  
            })
          }
        </>
      </Container>
))}

export default MainView