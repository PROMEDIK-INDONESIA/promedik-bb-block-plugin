import React from 'react'
import { DateConverter, LetterCapitalizer, PromedikDarkGrey, PromedikGreen, PromedikGrey, PromedikLightGrey } from '../../statics'
// import { useKeenSlider } from "keen-slider/react"
// import Slider from "react-slick";

export const PromedikArticleSave = ({ props }) => {
  console.log(props, '<<< props save');
  const { attributes: { data, authors, categories, tags, articleShowNumber } } = props

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
        <div>
          <div
            className='article-card-container'
            style={{
              minWidth: '250px',
              minHeight: '500px',
              borderRadius: '10px',
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              borderWidth: '1px',
              borderColor: PromedikGrey
            }}
          >
            <div style={{ flex: 1, display: 'flex', width: '100%' }}>
              <img
                src={datum.articleCover}
                style={{
                  flex: 1,
                  // display: 'flex',
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%'
                }}
              />
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '10px' }}>
              <div style={{ flex: 1, display: 'flex' }}>
                <div
                  style={{
                    color: PromedikGreen,
                    fontSize: '25px',
                    lineHeight: 1.5
                  }}
                >
                  {datum.title}
                </div>
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
        </div>
      )
    })
  }

  return (
    <div
      className={articleShowNumber > 3 ? 'container-article-card-grid-many-columns' :'container-article-card-grid'}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${articleShowNumber}, 1fr)`,
        gap: '20px'
        // flex: 1,
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        // alignItems: 'center'
      }}
    >
      {/* <Slider {...settings}> */}
      {/* <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div> */}
      {data ? RenderArticles(data) : <p>loading...</p>}
      {/* </Slider> */}
      {/* <div> */}
      {/* {data ? RenderArticles(data) : <p>loading...</p>} */}
      {/* </div> */}
      {/* <div ref={sliderRef} className="keen-slider" style={{ maxWidth: '100%' }}>
        {data ? RenderArticles(data) : <p>loading...</p>}
        <div
          className='keen-slider__slide'
          style={{
            overflow: 'hidden',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        />
      </div> */}
    </div>
  )
}

// import React from "react";
// import ReactDOM from "react-dom";

// import "./styles.css";

// function App() {
//   const ArticleSingleCard = (idx) => {
//     return (
//       <div
//         style={{
//           // maxWidth: "500px",
//           // maxHeight: "300px",
//           border: "1px black solid",
//           borderRadius: "10px",
//           overflow: "hidden"
//         }}
//       >
//         <div
//           style={{
//             height: "200px"
//           }}
//         >
//           <img
//             src={
//               idx % 2
//                 ? "https://i.kym-cdn.com/entries/icons/mobile/000/026/638/cat.jpg"
//                 : idx % 3
//                 ? "https://i.pinimg.com/originals/c0/4f/8b/c04f8b31f30a6d031db192654b77e208.jpg"
//                 : "https://c.tenor.com/gz3PEMbILiYAAAAC/bongo-cat.gif"
//             }
//             style={{
//               width: "100%",
//               height: "100%",
//               backgroundColor: "red",
//               objectFit: "cover"
//             }}
//           />
//         </div>
//         <div
//           style={{
//             padding: "20px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start"
//           }}
//         >
//           <div
//             style={{ fontSize: "28px", textAlign: "left" }}
//             className="title"
//           >
//             6 Cara Mengatasi Stress karena Tak Kunjung Hamil
//           </div>
//           <div>
//             <div>Posted on 17 June, 2021 By Admin</div>
//             <div>Posted in Perbaikan Sperma 0 Comments</div>
//           </div>
//           <div style={{ textAlign: "left" }} className="title">
//             Analisa Sperma (Sperm Analysis) merupakan sebuah pemeriksaaan untuk
//             menilai keadaan sperma secara objektif. Pemeriksaan ini dapat
//             memberiksan gambaran proses Spermatogenesis
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const RenderArticleCard = () => {
//     return Array(20)
//       .fill(1)
//       .map((data, idx) => {
//         return (
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             {ArticleSingleCard(idx)}
//           </div>
//         );
//       });
//   };
//   return (
//     <div
//       className="App"
//       style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gridGap: "1rem"
//       }}
//     >
//       {RenderArticleCard()}
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

// .title {
//   overflow: hidden;
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   line-break: anywhere;

//   line-clamp: 2;
//   -webkit-line-clamp: 2;
// }