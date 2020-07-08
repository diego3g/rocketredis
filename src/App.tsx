import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { defaultTheme } from './styles/theme'
import { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import ConnectionList from './components/ConnectionList'
import CodeView from './components/CodeView'
import ConnectionDetails from './components/ConnectionDetails'
import Connection from './components/Connection'
import Modal from 'react-modal'
import AppProvider from './context'
import { Container, Content } from './styles/Main'

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
