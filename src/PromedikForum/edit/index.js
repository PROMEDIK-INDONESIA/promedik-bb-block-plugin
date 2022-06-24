import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_DISCUSSION, GET_FORUMS, GET_MEMBER_AVATAR } from '../../statics/API'
import { PromedikDarkGrey, PromedikGreen, PromedikGrey, PromedikLightGrey } from '../../statics'
import {
  InspectorControls,
  useBlockProps
} from '@wordpress/block-editor';
import { Panel, PanelBody, CheckboxControl, SelectControl } from '@wordpress/components';
import moment from 'moment'

export const PromedikForumEdit = ({ props }) => {
  useEffect(() => {
  }, [setForum])

  useEffect(() => {
    fetchData()
    GetDataDiscuss().then(value => GetDiscussionFullDetail(value))
  }, [])

  const SelectType = (type) => {
    switch (type) {
      case 'new_member':
        return 'new_member'
      case 'activity_update':
        return 'activity_update'
      case 'activity_comment':
        return 'activity_comment'
      case 'bbp_topic_create':
        return 'bbp_topic_create'
      case 'bbp_reply_create':
        return 'bbp_reply_create'
      case 'new_blog_post':
        return 'new_blog_post'
      case 'new_blog_comment':
        return 'new_blog_comment'
      case 'all':
        return
    }
  }

  // new_member, new_avatar, updated_profile, activity_update, activity_comment, bbp_topic_create, bbp_reply_create, new_blog_post, and new_blog_comment

  const [forum, setForum] = useState([])
  const [discussion, setDiscussion] = useState([])
  const [IsAvatarHide, setIsAvatarHide] = useState(props.attributes.isHideAvatar !== undefined ? props.attributes.isHideAvatar : false);

  const GetDataDiscuss = async () => {
    try {
      const DiscussionData = await axios.get(GET_DISCUSSION) // array
      return DiscussionData.data
    } catch (error) {
      console.log(error, '<<< get discussion forum content');
    }
  }

  const GetDiscussionFullDetail = (DiscussionData) => {
    const promises = DiscussionData.map(async (data) => {
      const ReformatDate = moment(data.last_active_time).format("YYYY-MM-DD[T]HH:mm:ss")
      const LastActiveDiscussion = moment(ReformatDate).fromNow()
      const UserAvatar = await axios.get(GET_MEMBER_AVATAR(data.author))
      const result = {
        lastActiveTime: LastActiveDiscussion,
        date: data.last_active_time,
        title: data.title.raw,
        totalPersondata: data.voice_count,
        totalReply: data.total_reply_count,
        userAvatar: UserAvatar.data.thumb,
        link: data.link
      }
      return result
    });
    Promise.all(promises).then(value => setDiscussion(value)) // kalau gak pake promise all dan .then ini, nanti jadinya bakal UVWX 0 null
  }

  const fetchData = async () => {
    try {
      const ForumData = await axios.get(GET_FORUMS)
      const ForumFiltered = []
      if (ForumData.data) {
        ForumData.data.map((data, idx) => {
          // const ReformatDate = moment(data.modified).format("YYYY-MM-DD[T]HH:mm:ss")
          const LastModifiedForum = moment(data.modified).fromNow()
          ForumFiltered.push({
            title: data.title.raw,
            shortContent: data.short_content,
            link: data.link,
            featuredMedia: data.featured_media.thumb,
            lastModified: LastModifiedForum
          })
        })
        setForum(ForumFiltered)
        if (props.setAttributes) {
          props.setAttributes({ data: ForumFiltered })
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ActivityForumDataType = [
    {
      value: "all",
      label: "All"
    },
    {
      value: "new_member",
      label: "New Member"
    },
    {
      value: "activity_update",
      label: "Activity Update"
    },
    {
      value: "bbp_topic_create",
      label: "Topic Created"
    },
    {
      value: "bbp_reply_create",
      label: "Reply Created"
    },
    {
      value: "new_blog_post",
      label: "New Blog Post"
    },
    {
      value: "new_blog_comment",
      label: "New Blog Comment"
    }
  ]

  const BlockSetting = () => {
    return (
      <div {...useBlockProps()}>
        <InspectorControls>
          <Panel header="Card Setting">
            <PanelBody title="User Avatar">
              <CheckboxControl
                label="Hide User Avatar"
                checked={IsAvatarHide}
                onChange={(e) => {
                  setIsAvatarHide(e)
                  props.setAttributes({ isHideAvatar: e })
                }}
              />
            </PanelBody>
            <PanelBody title="Activity Forum Content">
              <SelectControl
                options={ActivityForumDataType}
                onChange={(e) => console.log(e, '<<< on change selec control')}
              />
            </PanelBody>
          </Panel>
        </InspectorControls>
      </div>
    );
  }

  const RenderCardDiscussion = (discussionData) => {
    if (discussionData.length > 0) {
      return discussionData.map((data, idx) => {
        return (
          <div style={{ borderWidth: 1, borderColor: 'orange' }}>
            <div>
              {data.title}
            </div>
            <div>
              {data.shortContent}
            </div>
            <div>
              {data.link}
            </div>
            <div>
              {data.featuredMedia}
            </div>
          </div>
        )
      })
    }
  }

  // lastActiveTime: LastActiveDiscussion,
  // date: data.last_active_time,
  // title: data.title.raw,
  // totalPersondata: data.voice_count,
  // totalReply: data.total_reply_count,
  // userAvatar: UserAvatar.data.thumb,
  // link: data.link

  const RenderCardForum = (forumData) => {
    if (forumData.length > 0) {
      return forumData.map((data, idx) => {
        return (
          <div
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginLeft: idx === 0 ? '0px' : '10px',
              marginRight: idx === forumData.length - 1 ? '0px' : '10px',
              borderWidth: '1px',
              borderColor: PromedikGrey
            }}
          >
            <div style={{ flex: 1, display: 'flex' }}>
              <img
                src={data.featuredMedia}
                style={{
                  width: '200px',
                  height: '200px'
                }}
              />
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '10px' }}>
              <div style={{ flex: 1, display: 'flex' }}>
                <a
                  href={data.link}
                  style={{
                    color: PromedikGreen,
                    fontSize: '18px',
                    textDecoration: 'none'
                  }}
                >
                  {data.title}
                </a>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  flex: 3, display: 'flex',
                  color: PromedikDarkGrey,
                  margin: '10px 0 10px 0'
                }}
              >
                {data.shortContent}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: PromedikDarkGrey,
                  flex: 1, display: 'flex'
                }}
              >
                {data.lastModified}
              </div>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <div
      style={{
        // display: 'flex',
        // flex: 1,
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center'
      }}
    >
      {BlockSetting()}
      <div style={{ display: 'flex', flex: 1 }}>
        {forum ? RenderCardForum(forum) : <p>loading...</p>}
      </div>
      <div>
        {/* {discussion ? RenderCardDiscussion(discussion) : <p>loading...</p>} */}
      </div>
    </div>
  )
}