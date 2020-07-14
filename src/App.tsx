import React from 'react'
import { render } from 'react-dom'
import Modal from 'react-modal'
import { ThemeProvider } from 'styled-components'

import CodeView from './components/CodeView'
import Connection from './components/Connection'
import ConnectionDetails from './components/ConnectionDetails'
import ConnectionList from './components/ConnectionList'
import Header from './components/Header'
import AppProvider from './context'
import { GlobalStyle } from './styles/GlobalStyle'
import { Container, Content } from './styles/Main'
import { defaultTheme } from './styles/theme'

import '../i18n'

Modal.setAppElement('#root')

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppProvider>
        <Container>
          <Header />
          <Content>
            <ConnectionList />
            <Connection>
              <ConnectionDetails />
              <CodeView />
            </Connection>
          </Content>
        </Container>
      </AppProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

render(<App />, document.getElementById('root'))
