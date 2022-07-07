import React from 'react'
import { DateConverter, LetterCapitalizer, PromedikDarkGrey, PromedikGreen, PromedikGrey, PromedikLightGrey } from '../../statics'
// import { useKeenSlider } from "keen-slider/react"
// import Slider from "react-slick";

export const PromedikArticleSave = ({ props }) => {
  console.log(props, '<<< props save');
  const { attributes: { data, authors, categories, tags, articleGridPixel } } = props

  const RenderArticles = (data) => {
    return data.map((datum, idx) => {
      const RenderCategories = (categories) => {
        return categories.map((category) => {
          return (
            <a style={{ marginRight: '5px' }} href={category.link}>
              {`${category.name}`}
            </a>
          )
        })
      }

      const HTMLdataArticleShortContent = { __html: datum.shortContent }
      return (
        <div
          style={{
            border: `1px ${PromedikGrey} solid`,
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: "200px"
            }}
          >
            <img
              src={datum.articleCover}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "grey",
                objectFit: "cover"
              }}
            />
          </div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <div
              style={{ fontSize: "24px", textAlign: "left" }}
              className="title"
            >
              {datum.title}
            </div>
            {/* <div style={{ margin: '10px 0px 10px 0px' }}> */}
            <div style={{ fontSize: '14px', display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ marginRight: '5px' }}>{`Posted on ${datum.date}`}</div>
              <span style={{ marginRight: '5px' }}>By</span>
              <a href={datum.authorLink}>
                {`${datum.authorName}`}
              </a>
            </div>
            <div style={{ fontSize: '14px', display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ marginRight: '5px' }}>Posted in</div>
              {RenderCategories(datum.categories)}
              <a href={datum.commentsLink}>
                {`${datum.comments} Comments`}
              </a>
            </div>
            {/* <div style={{ fontSize: '14px', display: 'flex' }}>
              </div> */}
            {/* </div> */}
            <div
              style={{
                // flex: 3,
                display: 'flex',
                color: PromedikDarkGrey,
                marginBottom: '10px'
              }}
            >
              <div
                className="title"
                dangerouslySetInnerHTML={HTMLdataArticleShortContent}
                style={{
                  fontSize: '13px',
                  // display: '-webkit-box',
                  // '-webkit-line-clamp': 3,
                  // '-webkit-box-orient': 'vertical',
                  // overflow: 'hidden'
                }}
              />
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${articleGridPixel}, 1fr))`,
        gridGap: "1rem"
      }}
    >
      {data ? RenderArticles(data) : <p>loading...</p>}
    </div>
  )
}

/**

<div
          style={{
            border: `1px ${PromedikGrey} solid`,
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: "200px"
            }}
          >
            <img
              src={datum.articleCover}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "grey",
                objectFit: "cover"
              }}
            />
          </div>
          <div
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <div
              style={{ fontSize: "24px", textAlign: "left" }}
              className="title"
            >
              {datum.title}
            </div>
            <div style={{ margin: '10px 0px 10px 0px' }}>
                <div style={{ fontSize: '14px', display: 'flex' }}>
                  <div style={{ marginRight: '5px' }}>{`Posted on ${datum.date} By`}</div>
                  <a href={datum.authorLink}>
                    {`${datum.authorName}`}
                  </a>
                </div>
                <div style={{ fontSize: '14px', display: 'flex' }}>
                  <div style={{ marginRight: '5px' }}>Posted in</div>
                  {RenderCategories(datum.categories)}
                  <a href={datum.commentsLink}>
                    {`${datum.comments} Comments`}
                  </a>
                </div>
              </div>
            <div
                style={{
                  flex: 3,
                  display: 'flex',
                  color: PromedikDarkGrey,
                  marginBottom: '10px'
                }}
              >
                <div
                  className="article-short-content"
                  dangerouslySetInnerHTML={HTMLdataArticleShortContent}
                  style={{
                    fontSize: '13px',
                    display: '-webkit-box',
                    '-webkit-line-clamp': 3,
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden'
                  }}
                />
              </div>
          </div>
        </div>

 */