import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_ACTIVITY_FEED } from '../../statics/API'
import { DateConverter, PromedikGreyBorderFeedContent, PromedikGreyNewPostBG } from '../../statics'
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
          const convertedDate = DateConverter(data.date)
          ActDataFiltered.push({
            avatar: data.user_avatar.thumb,
            title: data.title,
            actFeed: data.content.rendered,
            link: data.link,
            component: data.component,
            type: data.type,
            featureMedia: data.feature_media,
            date: convertedDate
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
              borderColor: PromedikGreyBorderFeedContent,
              // minWidth: '200px',
              // minHeight: '220px',
              maxHeight: '500px',
              overflow: 'hidden',
              margin: '10px',
              padding: '15px 15px 0px 15px',
              paddingBottom: data.type === 'new_blog_post' ? '20px' : '0px',
              borderRadius: 10,
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              textOverflow: 'ellipsis'
            }}
          >
            <div style={{ display: 'flex', flex: 1, alignItems: 'flex-start', margin: '0px 0px 10px 0px' }}>
              {!IsAvatarHide &&
                <div style={{ maxWidth: '35px', maxHeight: '35px', borderRadius: '20px', overflow: 'hidden' }}>
                  <img
                    src={data.avatar}
                  />
                </div>
              }
              <div
                style={{
                  fontSize: '14px',
                  paddingLeft: !IsAvatarHide && '10px'
                }}
              >
                {data.type === 'groups' || data.type === 'bbpress' ?
                  <div
                    // style={{
                    //   fontSize: '14px', paddingLeft: !IsAvatarHide && '10px'
                    // }}
                    dangerouslySetInnerHTML={HTMLdataTitle}
                  />
                  :
                  <div
                    // style={{
                    //   fontSize: '12px', paddingLeft: !IsAvatarHide && '10px'
                    // }}
                    dangerouslySetInnerHTML={HTMLdataTitle}
                  />
                }
                <div>{data.date}</div>
              </div>
            </div>
            {data.type === 'new_blog_post' ?
              <div
                style={{
                  // flex: 75,
                  // display: 'flex',
                  // maxHeight: '200px',
                  // minHeight: '500px',
                  overflow: 'hidden',
                  borderWidth: '1px',
                  borderColor: PromedikGreyBorderFeedContent,
                  borderRadius: '6px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxHeight: '200px',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={data.featureMedia}
                    style={{ flex: 1 }}
                  />
                </div>
                <div style={{ padding: '10px', backgroundColor: PromedikGreyNewPostBG }}>
                  <div
                    dangerouslySetInnerHTML={HTMLdataActFeed}
                    style={{
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>
              :
              <div
                style={{
                  flex: 75,
                  display: 'flex',
                  // maxHeight: '200px',
                  overflow: 'hidden',
                  borderWidth: '1px',
                  borderColor: PromedikGreyBorderFeedContent,
                  borderRadius: '6px',
                  padding: '10px'
                }}
              >
                <div
                  dangerouslySetInnerHTML={HTMLdataActFeed}
                  style={{
                    fontSize: '13px'
                  }}
                />
              </div>
            }
            {data.type === 'new_blog_post' ?
              <div></div>
              :
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
            }
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