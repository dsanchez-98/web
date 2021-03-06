/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: shanshang130@gmail.com
 * Date: 2018/7/24
 *
 */

import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'

export default class Section extends React.Component {
  state = {
    section: 0
  }

  constructor(props) {
    super(props)
    let offset = props.offset
    if (props.initialContentOffset) {
      offset = props.initialContentOffset.y
    }
    this.updateOffset(offset, true)
  }

  UNSAFE_componentWillReceiveProps(next) {
    this.updateOffset(next.offset, false, next)
  }

  updateOffset(offset: number, init: boolean = false, next) {
    let index = 0
    if (!next) next = this.props
    for (let i = 0; i < next.input.length; ++i) {
      if (offset > next.input[i]) {
        index = i
      }
    }
    const section = next.sectionIndexes[index]
    if (section !== this.state.section) {
      if (init) this.state = { section }
      else this.setState({ section })
    }
  }

  render() {
    const { data, style, heightForSection, renderSection, inverted } = this.props
    const { section } = this.state
    if (section === undefined || section < 0 || section >= data.length) return null
    const wStyle = StyleSheet.flatten([
      style,
      {
        height: heightForSection(section),
        transform: [...style.transform, { scaleY: inverted ? -1 : 1 }]
      }
    ])
    return (
      <Animated.View {...this.props} style={wStyle}>
        {renderSection(this.state.section)}
      </Animated.View>
    )
  }
}
