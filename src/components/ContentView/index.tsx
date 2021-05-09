import React, { useCallback, useState } from 'react'
import ReactJson from 'react-json-view'

import { useTheme } from 'styled-components'

import Button from '../Button'
import { Container } from './styles'

interface ContentViewProps {
  content: string
}

const JSONView: React.FC<ContentViewProps> = ({ content }) => {
  const { backgrounds, colors } = useTheme()

  return (
    <ReactJson
      src={JSON.parse(content)}
      name={false}
      iconStyle="square"
      quotesOnKeys={false}
      enableClipboard={false}
      displayDataTypes={false}
      displayObjectSize={false}
      style={{
        fontSize: '16px',
        fontFamily: 'inherit',
        fontWeight: 'normal'
      }}
      theme={{
        base00: backgrounds.darker,
        base01: backgrounds.dark,
        base02: backgrounds.lighter,
        base03: backgrounds.lightest,
        base04: colors.purpleDark,
        base05: colors.white,
        base06: colors.white,
        base07: colors.white,
        base08: colors.pink,
        base09: colors.pink,
        base0A: colors.green,
        base0B: colors.yellow,
        base0C: colors.pink,
        base0D: colors.pink,
        base0E: colors.green,
        base0F: colors.green
      }}
    />
  )
}

const ContentView: React.FC<ContentViewProps> = ({ content }) => {
  const [isFormatted, setFormatted] = useState(false)

  const handleFormat = useCallback(() => {
    setFormatted(!isFormatted)
  }, [setFormatted, isFormatted])

  return (
    <Container>
      <Button color="purple" onClick={handleFormat}>
        {isFormatted ? 'Raw' : 'JSON'}
      </Button>

      {isFormatted ? <JSONView content={content} /> : <div>{content}</div>}
    </Container>
  )
}

export default ContentView
