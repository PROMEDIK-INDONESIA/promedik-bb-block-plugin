export const BASE_URL = `https://www.promedik.com`
export const DEV_BASE_URL = `https://clone.promedik.com`
export const URL = BASE_URL
export const GET_ACTIVITY_FEED = `${URL}/wp-json/buddyboss/v1/activity?per_page=10`
export const GET_GROUPS = `${URL}/wp-json/buddyboss/v1/groups`
export const GET_TOPICS = `${URL}/wp-json/buddyboss/v1/topics?per_page=20`
export const GET_MEMBERS = `${URL}/wp-json/buddyboss/v1/members?per_page=15`
export const GET_ARTICLES_FROM_WP = `${URL}/wp-json/wp/v2/posts?per_page=10`
export const GET_ARTICLES_FROM_BB = `${URL}/wp-json/buddyboss/v1/activity?per_page=15&type=new_blog_post`
export const GET_DISCUSSION = `${URL}/wp-json/buddyboss/v1/topics?per_page=30&orderby=activity&order=desc`
export const GET_FORUMS = `${URL}/wp-json/buddyboss/v1/forums`
export const GET_FORUMS_BY_ID = (forum_id) => `${URL}/wp-json/buddyboss/v1/forums/${forum_id}`
export const GET_MEMBER_AVATAR = (user_id) => `${URL}/wp-json/buddyboss/v1/members/${user_id}/avatar`

export const GET_TAG_DETAIL_BY_ID = (tag_id) => `${URL}/wp-json/wp/v2/tags/${tag_id}`
export const GET_AUTHOR_DETAIL_BY_ID = (author_id) => `${URL}/wp-json/wp/v2/users/${author_id}`
export const GET_ARTICLE_COVER_BY_ID = (media_id) => `${URL}/wp-json/wp/v2/media/${media_id}`
export const GET_CATEGORY_BY_ID = (category_id) => `${URL}/wp-json/wp/v2/categories/${category_id}`