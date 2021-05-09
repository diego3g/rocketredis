import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useRecoilValue } from 'recoil'

import { currentKeyState } from '../../atoms/connections'
import ContentView from '../../components/ContentView'
import EmptyContent from '../../components/EmptyContent'
import { loadKeyContent, IKeyContent } from '../../services/key/LoadKeyContent'
import { Container } from './styles'

const KeyContent: React.FC = () => {
  const currentKey = useRecoilValue(currentKeyState)
  const [keyContent, setKeyContent] = useState<IKeyContent | null>(null)
  const { t } = useTranslation('keyContent')

  useEffect(() => {
    if (currentKey) {
      loadKeyContent(currentKey).then(content => {
        if (content) {
          setKeyContent(content)
        }
      })
    }
  }, [currentKey])

  return (
    <Container>
      {!currentKey ? (
        <EmptyContent message={t('empty')} />
      ) : (
        keyContent?.content && <ContentView content={keyContent.content} />
      )}
    </Container>
  )
}

export default memo(KeyContent)
