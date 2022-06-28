import React, { useEffect, useState } from 'react'
import { PromedikDarkGrey, PromedikForumCategoryDermatologi, PromedikForumCategoryFertilitas, PromedikForumCategoryLifestyle, PromedikWhite } from '../../statics'
// import './style.scss'

export const PromedikDiscussionSave = ({ props }) => {
  // console.log(isTabletOrMobile, '<<< isTabletOrMobile');
  const { attributes: {
    data,
    isHideAvatar,
    isFertilitasHidden,
    isLifestyleHidden,
    isDermatologiHidden,
    isColumn,
    isForumCategoryHide
  } } = props
  // console.log(isForumCategoryHide, '<<< props');

  const FilterData = [
    { Fertilitas: isFertilitasHidden },
    { Dermatologi: isDermatologiHidden },
    { Lifestyle: isLifestyleHidden }
  ]

  let temp = []

  FilterData.forEach((data, idx) => {
    if (Object.values(data)[0]) {
      temp.push(Object.keys(data)[0])
    }
  })

  const RenderCardDiscussion = (discussionData, temp) => {
    if (discussionData.length > 0) {
      return discussionData.map((data, idx) => {
        if (temp && temp.includes(data.forumCategory)) {
          return (
            <div key={idx} style={{ display: 'flex', flex: 1, padding: '20px', margin: '10px 0px 10px 0px' }}>
              {!isHideAvatar &&
                <div style={{ display: 'flex', marginRight: '10px' }}>
                  <img
                    src={data.userAvatar}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50px'
                    }}
                  />
                </div>
              }
              {/* <div style={{ display: 'flex', flex: 1, flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px' }}>
                <div style={{ fontSize: '16px' }}>{data.title}</div>
                <div className="discussion-detail-member-replies" style={{ display: 'flex', color: PromedikDarkGrey, fontSize: '14px' }}>
                  <div>{`replied ${data.lastActiveTime}`}</div>
                  <div style={{ display: 'flex', marginLeft: '15px' }}>
                    <div>{data.lastActiveTime > 1 ? `${data.totalPersondata} Members` : `${data.totalPersondata} Member`}</div>
                    <div style={{ marginLeft: '5px', marginRight: '5px' }}>|</div>
                    <div>{`${data.totalReply} Replies`}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div
                  style={{
                    backgroundColor: data.forumCategory === 'Lifestyle' ? PromedikForumCategoryLifestyle : data.forumCategory === 'Dermatologi' ? PromedikForumCategoryDermatologi : PromedikForumCategoryFertilitas,
                    // width: '100px',
                    // height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    padding: '5px 10px',
                    borderRadius: '10px',
                    color: PromedikWhite
                  }}
                >
                  {data.forumCategory}
                </div>
              </div> */}
              <div
                className="discussion-title-category-container"
                style={{
                  display: isColumn ? '' : 'flex',
                  flex: 5
                }}
              >
                <div className="discussion-title-content-container" style={{ display: 'flex', flex: 5, flexDirection: 'column' }}>
                  <div style={{ fontSize: '16px' }}>{data.title}</div>
                  <div
                    className="discussion-detail-date-member-replies"
                    style={{
                      display: isColumn ? '' : 'flex',
                      color: PromedikDarkGrey,
                      fontSize: '14px',
                      marginTop: isColumn ? '10px' : '0px', marginBottom: isColumn ? '10px' : '0px'
                    }}
                  >
                    <div>{`replied ${data.lastActiveTime}`}</div>
                    <div className="discussion-detail-member-replies" style={{ display: 'flex', marginLeft: isColumn ? '0px' : '15px' }}>
                      <div>{data.lastActiveTime > 1 ? `${data.totalPersondata} Members` : `${data.totalPersondata} Member`}</div>
                      <div style={{ marginLeft: '5px', marginRight: '5px' }}>|</div>
                      <div>{`${data.totalReply} Replies`}</div>
                    </div>
                  </div>
                </div>
                {!isForumCategoryHide &&
                  <div
                    className="discussion-detail-forum-category-container"
                    style={{
                      display: 'flex',
                      flex: 2,
                      alignItems: 'center',
                      justifyContent: isColumn ? 'flex-start' : 'flex-end',
                      paddingLeft: isColumn ? '0px' : '0px'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: data.forumCategory === 'Lifestyle' ? PromedikForumCategoryLifestyle : data.forumCategory === 'Dermatologi' ? PromedikForumCategoryDermatologi : PromedikForumCategoryFertilitas,
                        // width: '100px',
                        // height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        padding: '5px 10px',
                        borderRadius: '10px',
                        color: PromedikWhite
                      }}
                    >
                      {data.forumCategory}
                    </div>
                  </div>
                }
              </div>
            </div >
          )
        }
      })
    }
  }

  return (
    <div
      style={{
        borderWidth: '1px',
        borderColor: PromedikDarkGrey,
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: PromedikWhite
      }}
    >
      <div style={{ padding: '15px', borderBottom: `1px ${PromedikDarkGrey} solid` }}>
        All Discussions
      </div>
      {data.length > 0 ? RenderCardDiscussion(data, temp) : <div><p>loading...</p></div>}
      {/* <h1>masih ada category yang ngikut, padahal udh di filter pas di edit</h1> */}
    </div>
  )
}