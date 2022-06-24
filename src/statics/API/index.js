export const GET_ACTIVITY_FEED = 'https://www.promedik.com/wp-json/buddyboss/v1/activity?per_page=10'
export const GET_GROUPS = 'https://www.promedik.com/wp-json/buddyboss/v1/groups'
export const GET_TOPICS = 'https://www.promedik.com/wp-json/buddyboss/v1/topics?per_page=20'
export const GET_MEMBERS = 'https://www.promedik.com/wp-json/buddyboss/v1/members?per_page=15'
export const GET_ARTICLES_FROM_WP = 'https://www.promedik.com/wp-json/wp/v2/posts?per_page=10'
export const GET_ARTICLES_FROM_BB = 'https://www.promedik.com/wp-json/buddyboss/v1/activity?per_page=15&type=new_blog_post'
export const GET_DISCUSSION = 'https://www.promedik.com/wp-json/buddyboss/v1/topics?per_page=30&orderby=activity&order=desc'
export const GET_FORUMS = 'https://www.promedik.com/wp-json/buddyboss/v1/forums'
export const GET_FORUMS_BY_ID = (forum_id) => `https://www.promedik.com/wp-json/buddyboss/v1/forums/${forum_id}`
export const GET_MEMBER_AVATAR = (user_id) => `https://www.promedik.com/wp-json/buddyboss/v1/members/${user_id}/avatar`