import React from 'react'
import PropTypes from 'prop-types'
import { TeamsPageTemplate } from '../../templates/teams-page'

const TeamsPagePreview = ({ entry, widgetFor }) => (
  <TeamsPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

TeamsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default TeamsPagePreview
