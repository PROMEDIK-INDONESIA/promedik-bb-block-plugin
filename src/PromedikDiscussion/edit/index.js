import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_DISCUSSION, GET_FORUMS, GET_FORUMS_BY_ID, GET_MEMBER_AVATAR } from '../../statics/API'
import { PromedikDarkGrey, PromedikForumCategoryDermatologi, PromedikForumCategoryFertilitas, PromedikForumCategoryLifestyle, PromedikGreen, PromedikGrey, PromedikLightGreen, PromedikLightGrey, PromedikWhite } from '../../statics'
import {
  InspectorControls,
  useBlockProps
} from '@wordpress/block-editor';
import { Panel, PanelBody, CheckboxControl, SelectControl } from '@wordpress/components';
import moment from 'moment'

export const PromedikDiscussionEdit = ({ props }) => {
  const [discussion, setDiscussion] = useState([])
  const [forumCategory, setForumCategory] = useState([])
  const [isColumn, setIsColumn] = useState(props.attributes.isColumn !== undefined ? props.attributes.isColumn : false)
  const [isForumCategoryHide, setIsForumCategoryHide] = useState(props.attributes.isForumCategoryHide !== undefined ? props.attributes.isForumCategoryHide : false)

  const [renderForumCategoryContent, setForumCategoryContent] = useState(props.attributes.arrayForumCategory ? props.attributes.arrayForumCategory : ['Fertilitas', 'Dermatologi', 'Lifestyle'])

  const [isFertilitasHidden, setIsFertilitas] = useState(props.attributes.isFertilitasHidden !== undefined ? props.attributes.isFertilitasHidden : true);
  const [isLifestyleHidden, setIsLifestyle] = useState(props.attributes.isLifestyleHidden !== undefined ? props.attributes.isLifestyleHidden : true);
  const [isDermatologiHidden, setIsDermatologi] = useState(props.attributes.isDermatologiHidden !== undefined ? props.attributes.isDermatologiHidden : true);

  const [IsAvatarHide, setIsAvatarHide] = useState(props.attributes.isHideAvatar !== undefined ? props.attributes.isHideAvatar : false);

  useEffect(() => {

    // const { attributes: {
    //   isFertilitasHidden,
    //   isDermatologiHidden,
    //   isLifestyleHidden
    // } } = props
    let FilterTemp = []

    if (props.attributes.isFertilitasHidden) {
      FilterTemp.push('Fertilitas')
    }
    if (props.attributes.isDermatologiHidden) {
      FilterTemp.push('Dermatologi')
    }
    if (props.attributes.isLifestyleHidden) {
      FilterTemp.push('Lifestyle')
    }

    props.setAttributes({ isHideAvatar: IsAvatarHide })
    props.setAttributes({ isColumn: isColumn })
    props.setAttributes({ isForumCategoryHide: isForumCategoryHide })
    props.setAttributes({ isFertilitasHidden: isFertilitasHidden })
    props.setAttributes({ isLifestyleHidden: isLifestyleHidden })
    props.setAttributes({ isDermatologiHidden: isDermatologiHidden })
    props.setAttributes({ arrayForumCategory: renderForumCategoryContent })
    GetDataDiscuss().then(value => GetDiscussionFullDetail(value))

    if (props.attributes.isFertilitasHidden || props.attributes.isDermatologiHidden || props.attributes.isLifestyleHidden) {
      setForumCategoryContent(FilterTemp)
    }
  }, [])

  useEffect(() => {
    props.setAttributes({ arrayForumCategory: renderForumCategoryContent })
  }, [setForumCategoryContent, props.attributes.arrayForumCategory])


  const handleChangeForumCategoryFilter = (checkedData) => {
    switch (checkedData.checked) {
      case "Fertilitas":
        setIsFertilitas(!isFertilitasHidden);
        break;
      case "Dermatologi":
        setIsDermatologi(!isDermatologiHidden);
        break;
      case "Lifestyle":
        setIsLifestyle(!isLifestyleHidden);
        break;
      default:
        break;
    }

    const UpdateArrayData = renderForumCategoryContent.concat(checkedData.checked)
    if (renderForumCategoryContent.length > 0) {
      if (renderForumCategoryContent.includes(checkedData.checked)) {
        const NewArray = renderForumCategoryContent.filter((data) => data !== checkedData.checked)
        setForumCategoryContent(NewArray);
        props.setAttributes({ arrayForumCategory: NewArray })
      } else {
        setForumCategoryContent(renderForumCategoryContent.concat(checkedData.checked));
        props.setAttributes({ arrayForumCategory: UpdateArrayData })
      }
    } else {
      setForumCategoryContent(renderForumCategoryContent.concat(checkedData.checked));
      props.setAttributes({ arrayForumCategory: UpdateArrayData })
    }
  };

  const GetDataDiscuss = async () => {
    try {
      const DiscussionData = await axios.get(GET_DISCUSSION) // array
      const ForumsData = await axios.get(GET_FORUMS) // array
      const CategoryForumTitle = []
      if (ForumsData.data) {
        ForumsData.data.map((data, idx) => {
          CategoryForumTitle.push(data.title.rendered)
        })
      }
      setForumCategory(CategoryForumTitle)
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
      const ForumCategory = await axios.get(GET_FORUMS_BY_ID(data.forum_id))
      const result = {
        lastActiveTime: LastActiveDiscussion,
        date: data.last_active_time,
        title: data.title.raw,
        totalPersondata: data.voice_count,
        totalReply: data.total_reply_count,
        userAvatar: UserAvatar.data.thumb,
        link: data.link,
        forumCategory: ForumCategory.data.title.raw
      }
      return result
    });
    Promise.all(promises).then(value => {
      props.setAttributes({ data: value })
      setDiscussion(value)
    }) // kalau gak pake promise all dan .then ini, nanti jadinya bakal UVWX 0 null
  }

  const BlockSetting = () => {
    return (
      <div {...useBlockProps()}>
        <InspectorControls>
          <Panel header="Discussion Setting">
            <PanelBody title="Show Forum Discussion Category">
              {/* {forumCategory.map((data, idx) => {
                return (
                  <CheckboxControl
                    label={data}
                    checked={forumCategory.includes(data) ? true : false}
                    onChange={(e) => {
                      if (forumCategory.includes(data)) {
                        setForumCategory([...forumCategory, data])
                      } else {
                        const filtered = forumCategory.filter(value => value !== data)
                        setForumCategory(filtered)
                      }
                    }}
                  />
                )
              })} */}
              <CheckboxControl
                label="Fertilitas"
                checked={isFertilitasHidden}
                onChange={(e) => {
                  handleChangeForumCategoryFilter({ checked: 'Fertilitas' })
                  props.setAttributes({ arrayForumCategory: renderForumCategoryContent })
                  // setIsFertilitas(e)
                  props.setAttributes({ isFertilitasHidden: e })
                }}
              />
              <CheckboxControl
                label="Dermatologi"
                checked={isDermatologiHidden}
                onChange={(e) => {
                  handleChangeForumCategoryFilter({ checked: 'Dermatologi' })
                  props.setAttributes({ arrayForumCategory: renderForumCategoryContent })
                  // setIsDermatologi(e)
                  props.setAttributes({ isDermatologiHidden: e })
                }}
              />
              <CheckboxControl
                label="Lifestyle"
                checked={isLifestyleHidden}
                onChange={(e) => {
                  handleChangeForumCategoryFilter({ checked: 'Lifestyle' })
                  props.setAttributes({ arrayForumCategory: renderForumCategoryContent })
                  // setIsLifestyle(e)
                  props.setAttributes({ isLifestyleHidden: e })
                }}
              />
            </PanelBody>
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
            <PanelBody title="Discussion Column">
              <CheckboxControl
                label="Show Discussion in Column"
                checked={isColumn}
                onChange={(e) => {
                  setIsColumn(e)
                  props.setAttributes({ isColumn: e })
                }}
              />
            </PanelBody>
            <PanelBody title="Forum Category">
              {renderForumCategoryContent.length < 2 &&
                <CheckboxControl
                  label="Hide Forum Category"
                  checked={isForumCategoryHide}
                  onChange={(e) => {
                    console.log(e, '<<< checkbox')
                    setIsForumCategoryHide(e)
                    props.setAttributes({ isForumCategoryHide: e })
                  }}
                />
              }
            </PanelBody>
          </Panel>
        </InspectorControls>
      </div>
    );
  }

  const HandleHideForumCategory = (category) => {
    if (!isForumCategoryHide) {
      return (
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
              backgroundColor: category === 'Lifestyle' ? PromedikForumCategoryLifestyle : category === 'Dermatologi' ? PromedikForumCategoryDermatologi : PromedikForumCategoryFertilitas,
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
            {category}
          </div>
        </div>
      )
    }
    // if (renderForumCategoryContent.length > 1) {
    // return (
    //   <div
    //     className="discussion-detail-forum-category-container"
    //     style={{
    //       display: 'flex',
    //       flex: 2,
    //       alignItems: 'center',
    //       justifyContent: isColumn ? 'flex-start' : 'flex-end',
    //       paddingLeft: isColumn ? '0px' : '0px'
    //     }}
    //   >
    //     <div
    //       style={{
    //         backgroundColor: category === 'Lifestyle' ? PromedikForumCategoryLifestyle : category === 'Dermatologi' ? PromedikForumCategoryDermatologi : PromedikForumCategoryFertilitas,
    //         // width: '100px',
    //         // height: '50px',
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         fontSize: '14px',
    //         padding: '5px 10px',
    //         borderRadius: '10px',
    //         color: PromedikWhite
    //       }}
    //     >
    //       {category}
    //     </div>
    //   </div>
    // )
    // } else if (!isForumCategoryHide) {
    //   return (
    //     <div
    //       className="discussion-detail-forum-category-container"
    //       style={{
    //         display: 'flex',
    //         flex: 2,
    //         alignItems: 'center',
    //         justifyContent: isColumn ? 'flex-start' : 'flex-end',
    //         paddingLeft: isColumn ? '0px' : '0px'
    //       }}
    //     >
    //       <div
    //         style={{
    //           backgroundColor: category === 'Lifestyle' ? PromedikForumCategoryLifestyle : category === 'Dermatologi' ? PromedikForumCategoryDermatologi : PromedikForumCategoryFertilitas,
    //           // width: '100px',
    //           // height: '50px',
    //           display: 'flex',
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           fontSize: '14px',
    //           padding: '5px 10px',
    //           borderRadius: '10px',
    //           color: PromedikWhite
    //         }}
    //       >
    //         {category}
    //       </div>
    //     </div>
    //   )
    // } else {
    //   return <div></div>
    // }
  }

  const RenderPlaceholder = (forumCategory) => {
    if (forumCategory.length > 0) {
      return forumCategory.map((data, idx) => {
        if (renderForumCategoryContent.includes(data)) {
          return (
            <div key={idx} style={{ display: 'flex', flex: 1, padding: '20px', margin: '10px 0px 10px 0px' }}>
              {!IsAvatarHide &&
                <div
                  style={{
                    display: 'flex',
                    marginRight: '10px'
                  }}
                >
                  {/* <img
                  src={data.userAvatar}
                  style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50px'
                  }}
                  /> */}
                  <div
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50px',
                      backgroundColor: PromedikLightGrey,
                      color: PromedikDarkGrey,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    A
                  </div>
                </div>
              }
              <div
                className="discussion-title-category-container"
                style={{
                  display: isColumn ? '' : 'flex',
                  flex: 5
                }}
              >
                <div className="discussion-title-content-container" style={{ display: 'flex', flex: 5, flexDirection: 'column' }}>
                  <div style={{ fontSize: '16px' }}>Judul Forum Kesehatan Promedik</div>
                  <div
                    className="discussion-detail-date-member-replies"
                    style={{
                      display: isColumn ? '' : 'flex',
                      color: PromedikDarkGrey,
                      fontSize: '14px',
                      marginTop: isColumn ? '10px' : '0px', marginBottom: isColumn ? '10px' : '0px'
                    }}
                  >
                    <div>Dibalas 3 Hari yang lalu</div>
                    <div className="discussion-detail-member-replies" style={{ display: 'flex', marginLeft: isColumn ? '0px' : '15px' }}>
                      <div>2 Pengguna</div>
                      <div style={{ marginLeft: '5px', marginRight: '5px' }}>|</div>
                      <div>5 Balasan</div>
                    </div>
                  </div>
                </div>
                {HandleHideForumCategory(data)}
                {/* {!isForumCategoryHide ?
                  < div
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
                        backgroundColor: data === 'Lifestyle' ? PromedikForumCategoryLifestyle : data === 'Dermatologi' ? PromedikForumCategoryDermatologi : PromedikForumCategoryFertilitas,
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
                      {data}
                    </div>
                  </div>
                  :
                  <div></div>
                } */}
              </div>
            </div >
          )
        }
      })
    }
  }

  const RenderCardDiscussion = (discussionData) => {
    if (discussionData.length > 0) {
      return discussionData.map((data, idx) => {
        if (renderForumCategoryContent.includes(data.forumCategory)) {
          return (
            <div key={idx} style={{ display: 'flex', flex: 1, padding: '20px', margin: '10px 0px 10px 0px' }}>
              {!IsAvatarHide &&
                <div style={{ display: 'flex' }}>
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
                      fontSize: '14px'
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
        {/* <div>{renderForumCategoryContent}</div> */}
        <div>{forumCategory}</div>
      </div>
      {BlockSetting()}
      {/* <div style={{ display: 'flex', flex: 1 }}>
        {forum ? RenderCardForum(forum) : <p>loading...</p>}
      </div> */}
      <div>
        {/* {discussion ? RenderCardDiscussion(discussion) : <p>loading...</p>} */}
        {RenderPlaceholder(forumCategory)}
      </div>
    </div>
  )
}