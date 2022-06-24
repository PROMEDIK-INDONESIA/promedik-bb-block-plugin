import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_ACTIVITY_FEED } from '../../statics/API'
import {
  InspectorControls,
  useBlockProps
} from '@wordpress/block-editor';
import { Panel, PanelBody, CheckboxControl, SelectControl } from '@wordpress/components';

export const PromedikFeedEdit = ({ props }) => {
  useEffect(() => {
  }, [setActivityFeed])

  useEffect(() => {
    fetchData()
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

  const [actFeed, setActivityFeed] = useState([])
  const [IsAvatarHide, setIsAvatarHide] = useState(props.attributes.isHideAvatar !== undefined ? props.attributes.isHideAvatar : false);


  const fetchData = async () => {
    try {
      const ActivityData = await axios.get(GET_ACTIVITY_FEED)
      const ActDataFiltered = []
      if (ActivityData.data) {
        ActivityData.data.map((data, idx) => {
          ActDataFiltered.push({
            avatar: data.user_avatar.thumb,
            title: data.title,
            actFeed: data.content.rendered,
            link: data.link,
            component: data.component
          })
        })
        setActivityFeed(ActDataFiltered)
        if (props.setAttributes) {
          props.setAttributes({ data: ActDataFiltered })
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ActivityFeedDataType = [
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
            <PanelBody title="Activity Feed Content">
              <SelectControl
                options={ActivityFeedDataType}
                onChange={(e) => console.log(e, '<<< on change selec control')}
              />
            </PanelBody>
          </Panel>
        </InspectorControls>
      </div>
    );
  }

  const RenderSelectedActivityFeedDataType = () => {
    
  }

  const RenderCardActivityFeed = (ActData) => {
    if (ActData.length > 0) {
      return ActData.map((data, idx) => {
        const HTMLdataActFeed = { __html: data.actFeed }
        const HTMLdataTitle = { __html: data.title }

        return (
          <div
            key={idx}
            style={{
              borderWidth: 1,
              borderColor: '#45959B',
              // minWidth: '200px',
              minHeight: '220px',
              maxHeight: '220px',
              overflow: 'hidden',
              margin: '10px',
              padding: '10px',
              borderRadius: 10,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              textOverflow: 'ellipsis'
            }}
          >
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', margin: '10px 0px 10px 0px' }}>
              {!IsAvatarHide &&
                <div style={{ maxWidth: '35px', maxHeight: '35px', borderRadius: '20px', overflow: 'hidden' }}>
                  <img
                    src={data.avatar}
                  />
                </div>
              }
              {data.type === 'groups' || data.type === 'bbpress' ?
                <div
                  style={{
                    fontSize: '11px', paddingLeft: !IsAvatarHide && '10px'
                  }}
                  dangerouslySetInnerHTML={HTMLdataTitle}
                />
                :
                <div
                  style={{
                    fontSize: '12px', paddingLeft: !IsAvatarHide && '10px'
                  }}
                  dangerouslySetInnerHTML={HTMLdataTitle}
                />
              }
            </div>
            <div
              style={{
                flex: 75,
                display: 'flex',
                maxHeight: '130px',
                overflow: 'hidden'
              }}
            >
              <div
                dangerouslySetInnerHTML={HTMLdataActFeed}
                style={{
                  fontSize: '13px'
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex'
              }}
            >
              <a
                href={data.link}
                style={{
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: 'orange',
                  textDecoration: 'none'
                }}
              >
                Read More
              </a>
            </div>
          </div>
          // {[document.body.firstChild]}
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
      {actFeed ? RenderCardActivityFeed(actFeed) : <p>loading...</p>}
      {/* <p>{actFeed ? JSON.stringify(actFeed, null, 2) : 'actFeed loading'}</p> */}
    </div>
  )
}