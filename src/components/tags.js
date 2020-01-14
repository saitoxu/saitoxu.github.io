import React from 'react'
import { Link } from 'gatsby'
import slugify from "slugify"

const Tag = ({ tag }) => (
  <Link to={`/tags/${slugify(tag, { remove: /[*+~.()'"!:@]/g, lower: true })}`}>
    <li>{tag}</li>
  </Link>
)

const Tags = ({ tags }) => (
  <ul>
    {(tags || []).map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </ul>
);

export default Tags
