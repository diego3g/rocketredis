import React from 'react'
import { render } from '@testing-library/react'

import Button from './index'

test('button should renders', () => {
  const { getByText } = render(<Button>ButtonContent</Button>)

  expect(getByText('ButtonContent')).toBeTruthy()
})
