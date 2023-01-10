import React from 'react'
import styled from 'styled-components'

const DivErrorContainer = styled.div`
  background-color: #f8d7da;
  border-radius: .5rem;
  border: solid 1px #93204b;
  padding: .5rem;
  margin: .5rem 0;
`

const ErrorMessage = styled.p`
color: #93204b;
`

const ErrorData = () => {
  return (
    <DivErrorContainer>
      <ErrorMessage>Se ha producido un error.</ErrorMessage>
    </DivErrorContainer>
  )
}

export default ErrorData
