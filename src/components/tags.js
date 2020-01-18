import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"

const Tag = ({ tag }) => (
  <Link
    to={`/tags/${slugify(tag, { remove: /[*+~.()'"!:@]/g, lower: true })}`}
    style={{ marginRight: 8 }}
  >
    #{tag}
  </Link>
)

const Tags = ({ tags }) => (
  <div>
    {(tags || []).map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </div>
)

export default Tags
