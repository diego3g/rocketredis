import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import { defaultTheme } from './styles/theme'
import styled, { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CodeView from './components/CodeView'
import ConnectionDetails from './components/ConnectionDetails'
import Connection from './components/Connection'

const mainElement = document.createElement('div')
const modalElement = document.createElement('div')

modalElement.id = 'modal'

document.body.appendChild(mainElement)
document.body.appendChild(modalElement)

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.background.dark};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.purpleDark};
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  width: 100%;
  flex: 1;

  display: flex;
`

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Header />
        <Content>
          <Sidebar />
          <Connection>
            <ConnectionDetails />
            <CodeView />
          </Connection>
        </Content>
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  )
}

render(<App />, mainElement)
