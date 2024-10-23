export type Issue = Partial<{
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
  labels: {
    id: number
    name: string
    color: string
    description?: string
    default?: boolean
  }[]
  state: 'open' | 'closed'
  locked: boolean
  assignee: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  } | null
  assignees: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }[]
  milestone: {
    title: string
    due_on: string | null
    html_url: string
  } | null
  comments: number
  created_at: string
  updated_at: string
  closed_at: string | null
  author_association: string
  active_lock_reason: string | null
  body: string | null

  timeline_url: string
  performed_via_github_app: string | null
  state_reason: string | null
}>

export type IPost = Partial<Issue>
