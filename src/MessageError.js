import React, { Component, useContext } from 'react'
import { Message } from 'semantic-ui-react'
import { StoreContext } from './index';
import { useObserver } from 'mobx-react';

const MessageExampleDismissibleBlock = () => {
  const store = useContext(StoreContext)

  const handleDismiss = () => {
    store.showError(false)
    store.setErrorMsg('')
  }

  return useObserver(() => (
    <>
      {store.hasError &&
      <Message negative style={{ marginTop: '1em'}}
          onDismiss={() => {handleDismiss()}}
          header='Error'
          content={store.errorMsg}
        />
      }
    </>

  ))
}

export default MessageExampleDismissibleBlock
