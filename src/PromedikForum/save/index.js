import React from 'react'
import { PromedikDarkGrey, PromedikGreen, PromedikGrey, PromedikLightGrey } from '../../statics'

export const PromedikForumSave = ({ props }) => {
  console.log(props, '<<< props');
  const { attributes: { data, isHideAvatar } } = props

  const RenderCardForum = (ForumData) => {
    if (ForumData.length > 0) {
      return ForumData.map((data, idx) => {
        return (
          <div
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginLeft: idx === 0 ? '0px' : '10px',
              marginRight: idx === ForumData.length - 1 ? '0px' : '10px',
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
      <div style={{ display: 'flex', flex: 1 }}>
        {data.length > 0 ? RenderCardForum(data) : <div><p>loading...</p></div>}
      </div>
    </div>
  )
}