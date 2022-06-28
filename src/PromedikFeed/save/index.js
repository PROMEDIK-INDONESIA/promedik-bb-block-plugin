import React from 'react'
import { PromedikGreyBorderFeedContent, PromedikGreyNewPostBG } from '../../statics'

export const PromedikFeedSave = ({ props }) => {
  const { attributes: { data, isHideAvatar } } = props
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
              margin: '0px 10px 10px 10px',
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
              {!isHideAvatar &&
                <div style={{ maxWidth: '35px', maxHeight: '35px', borderRadius: '20px', overflow: 'hidden' }}>
                  <img
                    src={data.avatar}
                  />
                </div>
              }
              <div
                className="feed-header-card-container"
                style={{
                  fontSize: '14px',
                  color: '#5a5a5a',
                  paddingLeft: !isHideAvatar && '10px'
                }}
              >
                {data.type === 'groups' || data.type === 'bbpress' ?
                  <div
                    className="feed-header-action-card"
                    // style={{
                    //   fontSize: '14px', paddingLeft: !isHideAvatar && '10px'
                    // }}
                    dangerouslySetInnerHTML={HTMLdataTitle}
                  />
                  :
                  <div
                    className="feed-header-action-card"
                    // style={{
                    //   fontSize: '12px', paddingLeft: !isHideAvatar && '10px'
                    // }}
                    dangerouslySetInnerHTML={HTMLdataTitle}
                  />
                }
                <div className="feed-header-date">{data.date}</div>
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
                    className="feed-content-new-post"
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
                  display: 'flex',
                  maxHeight: '200px',
                  overflow: 'hidden',
                  borderWidth: '1px',
                  borderColor: PromedikGreyBorderFeedContent,
                  borderRadius: '6px',
                  padding: '10px'
                }}
              >
                <div
                  className="feed-content-action-title"
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
      {data.length > 0 ? RenderCardActivityFeed(data) : <div><p>loading...</p></div>}
    </div>
  )
}