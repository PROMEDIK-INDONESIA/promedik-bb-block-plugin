import React from 'react'

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
              borderColor: '#45959B',
              minWidth: '200px',
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
              {!isHideAvatar &&
                <div style={{ maxWidth: '35px', maxHeight: '35px', borderRadius: '20px', overflow: 'hidden' }}>
                  <img
                    src={data.avatar}
                  />
                </div>
              }
              {data.component === 'groups' || data.component === 'bbpress' ?
                <div
                  style={{
                    fontSize: '11px', paddingLeft: !isHideAvatar && '10px'
                  }}
                  dangerouslySetInnerHTML={HTMLdataTitle}
                />
                :
                <div
                  style={{
                    fontSize: '12px', paddingLeft: !isHideAvatar && '10px'
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
              }}>
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
      {data.length > 0 ? RenderCardActivityFeed(data) : <div><p>loading...</p></div>}
    </div>
  )
}