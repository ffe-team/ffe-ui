import React, { Component } from 'react'
import classnames from 'classnames'

interface propTypes {
  src: string,
  lazy?: boolean,
  responsive?: boolean,
  className?: string,
}
interface stateTypes {
  src: string,
  loading: boolean,
}