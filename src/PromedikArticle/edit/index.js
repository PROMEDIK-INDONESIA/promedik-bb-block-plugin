import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_ARTICLES_FROM_WP, GET_ARTICLE_COVER_BY_ID, GET_AUTHOR_DETAIL_BY_ID, GET_CATEGORY_BY_ID, GET_DISCUSSION, GET_FORUMS, GET_MEMBER_AVATAR, GET_TAG_DETAIL_BY_ID } from '../../statics/API'
import { DateConverter, DateConverterClassic, LetterCapitalizer, PromedikDarkGrey, PromedikGreen, PromedikGrey, PromedikLightGrey } from '../../statics'
import {
  InspectorControls,
  useBlockProps
} from '@wordpress/block-editor';
import { Panel, PanelBody, CheckboxControl, SelectControl, Spinner, FormTokenField, RangeControl } from '@wordpress/components';
import moment from 'moment'
import { useKeenSlider } from "keen-slider/react"
import { dispatch } from '@wordpress/data';
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import "keen-slider/keen-slider.min.css"

export const PromedikArticleEdit = ({ props }) => {
  console.log(props, '<<< props edit');

  const [articles, setArticles] = useState([])
  const [sliderNumber, setSliderNumber] = useState(props.attributes.articleShowNumber || 3)
  const [forum, setForum] = useState([])
  const [masterArticles, setMasterArticles] = useState([])

  const [tagsLibrary, setTagsLibrary] = useState([])
  const [tagsDetailLibrary, setTagsDetailLibrary] = useState([])
  const [categoryLibrary, setCategoryLibrary] = useState([])
  const [authorLibrary, setAuthorLibrary] = useState([])

  const [mixTags, setMixTags] = useState(props.attributes.tags !== undefined ? props.attributes.tags : [])
  const [mixAuthors, setMixAuthors] = useState(props.attributes.authors !== undefined ? props.attributes.authors : [])
  const [mixCategories, setMixCategories] = useState(props.attributes.categories !== undefined ? props.attributes.categories : [])

  const [tagsFilter, setTagsFilter] = useState(props.attributes.tags !== undefined ? props.attributes.tags : [])
  const [isNarrow, setIsNarrow] = useState(false)
  const [categoryIDs, setCategoryIDs] = useState([])
  const [isLoadingNewArticleData, setIsLoadingNewArticleData] = useState(false)
  const [paramsCategory, setParamsCategory] = useState('')
  const [paramsAuthor, setParamsAuthor] = useState('')
  const [paramsTag, setParamsTag] = useState('')
  const [finalParams, setFinalParams] = useState({ categories: '', authors: '', tags: '' })

  // let categoryTemp = ''
  // let authorTemp = ''
  // let tagTemp = ''
  // let finalParams = ''


  // useEffect(() => {
  //   props.setAttributes({ categories: mixCategories })
  //   props.setAttributes({ authors: mixAuthors })
  //   props.setAttributes({ tags: mixTags })

  // }, [setMixCategories, setMixAuthors, setTagsFilter])

  useEffect(() => {
    GetArticleContent().then(value => GetArticleContentFullDetail(value))
  }, [])

  useEffect(() => {
    if (isLoadingNewArticleData) {
      dispatch('core/editor').lockPostSaving('noFeaturedImage');
    } else {
      dispatch('core/editor').unlockPostSaving('noFeaturedImage');
    }
  }, [isLoadingNewArticleData, setIsLoadingNewArticleData])


  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: {
      perView: sliderNumber,
      spacing: 15,
    },
  })

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const PrepareNewData = (newDatas) => {
    let result = newDatas.length > 0 && newDatas.map((newData) => {
      let articleCover = ''
      masterArticles.length > 0 && masterArticles.forEach(data => {
        if (newData.id === data.articleID) {
          articleCover = data.articleCover
        }
      })

      let NewCategory = []
      newData.categories.forEach((newCategory) => {
        categoryLibrary.length > 0 && categoryLibrary.forEach((masterCategory) => {
          if (newCategory === masterCategory.id) {
            NewCategory.push(masterCategory)
          }
        })
      })

      let NewAuthor = []
      let NewAuthorLink = ''
      let NewAuthorName = ''
      authorLibrary.length > 0 && authorLibrary.forEach((masterAuthor) => {
        if (newData.author === masterAuthor.id) {
          NewAuthor.push(masterAuthor)
          NewAuthorLink = masterAuthor.link
          NewAuthorName = masterAuthor.name
        }
      })

      let NewTag = []
      newData.tags.forEach((newTag) => {
        tagsDetailLibrary.length > 0 && tagsDetailLibrary.forEach((masterTag) => {
          if (newTag === masterTag.id) {
            NewTag.push(masterTag)
          }
        })
      })

      return {
        articleID: newData.id,
        title: newData.title.rendered,
        link: newData.link,
        shortContent: newData.excerpt.rendered,
        tags: NewTag,
        author: NewAuthor,
        authorName: NewAuthorName,
        authorLink: NewAuthorLink,
        articleCover: articleCover,
        date: DateConverterClassic(newData.modified),
        categories: NewCategory,
        comments: newData.comments_count,
        commentsLink: `${newData.link}#comments`
      }
    })
    return result
  }

  const FetchArticleDataFiltered = async (parameter) => {
    console.log(parameter, '<<< paramsnewdata');
    try {
      setIsLoadingNewArticleData(true)
      const FilteredData = await axios.get(`${GET_ARTICLES_FROM_WP}${parameter.categories}${parameter.tags}${parameter.authors}`)
      if (FilteredData.data) {
        console.log(FilteredData.data, '<<< FilteredData.data');
        setIsLoadingNewArticleData(false)
        props.setAttributes({ data: PrepareNewData(FilteredData.data) })
      } else {
        setIsLoadingNewArticleData(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const ParamsPool = (parameter) => {
    let NewParamsPool = { ...finalParams }
    if (parameter.categories) {
      const CategoryFilter = parameter.categories.length > 0 ? `&categories=${parameter.categories.toString()}` : ''
      NewParamsPool.categories = CategoryFilter
    } else if (parameter.tags) {
      const TagsFilter = parameter.tags.length > 0 ? `&tags=${parameter.tags.toString()}` : ''
      NewParamsPool.tags = TagsFilter
    } else if (parameter.authors) {
      const AuthorsFilter = parameter.authors.length > 0 ? `&author=${parameter.authors.toString()}` : ''
      NewParamsPool.authors = AuthorsFilter
    }
    setFinalParams(NewParamsPool)
    FetchArticleDataFiltered(NewParamsPool)
  }

  const handleInputChangeFilterCategories = (value, name, id) => {
    const CategoryLists = [...mixCategories]

    CategoryLists.forEach((category) => {
      if (category.name === name) {
        category.value = value // ganti value nya dari false -> true atau sebaliknya
      }
    })

    setMixCategories(CategoryLists)
    const FilteredStringCategory = FilterBeforeSavePage(CategoryLists)

    const ArrayOfCategoryID = FilteredStringCategory.map((id) => {
      return id.id
    })

    setParamsCategory(ArrayOfCategoryID.toString())

    ParamsPool({ categories: ArrayOfCategoryID })

    props.setAttributes({ filteredCategories: FilteredStringCategory })
    props.setAttributes({ categories: CategoryLists })
  }

  const handleInputChangeFilterAuthors = (value, name) => {
    const AuthorLists = [...mixAuthors]
    AuthorLists.forEach((author) => {
      if (author.name === name) {
        author.value = value
      }
    })

    setMixAuthors(AuthorLists)

    const FilteredStringAuthor = FilterBeforeSavePage(AuthorLists)

    const ArrayOfAuthorsID = FilteredStringAuthor.map((id) => {
      return id.id
    })

    props.setAttributes({ authors: AuthorLists })
    ParamsPool({ authors: ArrayOfAuthorsID })
    // FetchArticleDataFiltered({ authors: ArrayOfAuthorsID })

    // props.setAttributes({ filteredAuthors: FilteredStringAuthor })
    // props.setAttributes({ authors: AuthorLists })
  }

  const handleInputChangeFilterTags = (tokens) => {
    // console.log(tokens, "<<< tokens");
    const tagIDs = []
    const NewTagsLibrary = [...tagsLibrary]
    // console.log(FilterLists, '<<< tokens FilterLists');
    tagsDetailLibrary.forEach((tagLibrary) => {
      console.log(tagLibrary, '<<< tokentagLibrary');
      tokens.forEach((tag) => {
        console.log(tag, '<<< token');
        if (tagLibrary.name === tag) {
          tagIDs.push(tagLibrary.id)
        }
      })
    })
    setTagsFilter(tokens)
    console.log(tagIDs, "<<< token tagIDs");
    ParamsPool({ tags: tagIDs })
    props.setAttributes({ tags: tokens }) // tags for from save to edit
  }

  const ConvertTagsStringToTagsDetail = () => {

  }

  const ArrayOfTagCategoryAuthor = (articleData) => { // still needed?
    let duplicatedArrayOfCategory = []
    let arrayOfTags = []
    let duplicatedArrayOfAuthor = []

    let tempTags = []
    let tagsWithDetail = []

    articleData.map((article) => {
      article.categories.map((category) => {
        duplicatedArrayOfCategory.push(category)
      })
      article.tags.map((tag) => {
        arrayOfTags.push(tag.name)
        tempTags.push(tag)
      })

      tagsWithDetail = tempTags.reduce((unique, o) => {
        if (!unique.some(obj => obj.id === o.id && obj.name === o.name)) {
          unique.push(o);
        }
        return unique;
      }, []);

      duplicatedArrayOfAuthor.push({ name: article.author, id: article.authorID, value: true, link: article.authorLink })
    })

    const uniqueArrayOfCategory = duplicatedArrayOfCategory.reduce((unique, o) => {
      if (!unique.some(obj => obj.id === o.id && obj.name === o.name)) {
        unique.push(o);
      }
      return unique;
    }, []);

    const uniqueArrayOfAuthor = duplicatedArrayOfAuthor.reduce((unique, o) => {
      if (!unique.some(obj => obj.id === o.id && obj.name === o.name)) {
        unique.push(o);
      }
      return unique;
    }, []);

    // let uniqueArrayOfCategory = [...new Set(duplicatedArrayOfCategory)];
    let noDuplicateTags = [...new Set(arrayOfTags)];
    // let uniqueArrayOfAuthor = [...new Set(arrayOfAuthors)];

    // const cleanTags = noDuplicateTags.map((tag) => {
    //     return { name: tag, value: true }
    // })

    // const FilteredStringCategory = FilterBeforeSavePage(cleanCategories)
    // const FilteredStringAuthor = FilterBeforeSavePage(uniqueArrayOfAuthor)

    // props.setAttributes({ filteredCategories: FilteredStringCategory })
    // props.setAttributes({ filteredAuthors: FilteredStringAuthor })
    // setTagsLibrary(tagsWithDetail)
    if (props.attributes.categories !== undefined) {
      setMixCategories(props.attributes.categories)
    } else {
      setMixCategories(uniqueArrayOfCategory)
    }

    if (props.attributes.authors !== undefined) {
      setMixAuthors(props.attributes.authors)
    } else {
      setMixAuthors(uniqueArrayOfAuthor)
    }

    setMixTags(noDuplicateTags)
  }

  const FilterBeforeSavePage = (array) => {
    let result = []
    array.map((data) => {
      if (data.value) {
        result.push({ name: data.name, id: data.id, value: data.value })
      }
    })
    return result
  }

  const ArrayOfCategory = (categories) => {
    let arrayOfCategories = []

    categories.map((category) => {
      arrayOfCategories.push({ name: category.name, id: category.id, link: category.link })
    })

    let noDuplicateCategories = [...new Set(arrayOfCategories)];

    const cleanCategories = noDuplicateCategories.map((category) => {
      return { name: category, value: true }
    })

    setMixCategories(cleanCategories)
    return cleanCategories
  }

  // const ArrayOfTag = (articleData) => {
  //     let arrayOfCategories = []
  //     let arrayOfTags = []
  //     let arrayOfAuthors = []

  //     articleData.map((article) => {
  //         article.categories.map((category) => {
  //             arrayOfCategories.push(category.name)
  //         })
  //         article.tags.map((tag) => {
  //             arrayOfTags.push(tag.name)
  //         })
  //         arrayOfAuthors.push(article.author)
  //     })

  //     let noDuplicateCategories = [...new Set(arrayOfCategories)];
  //     let noDuplicateTags = [...new Set(arrayOfTags)];
  //     let noDuplicateAuthors = [...new Set(arrayOfAuthors)];

  //     const cleanCategories = noDuplicateCategories.map((category) => {
  //         return { name: category, value: true }
  //     })
  //     // const cleanTags = noDuplicateTags.map((tag) => {
  //     //     return { name: tag, value: true }
  //     // })
  //     const cleanAuthors = noDuplicateAuthors.map((author) => {
  //         return { name: author, value: true }
  //     })

  //     setMixTags(noDuplicateTags)
  //     setMixAuthors(cleanAuthors)
  //     setMixCategories(cleanCategories)
  // }

  const BlockSetting = () => {
    return (
      <div {...useBlockProps()}>
        <InspectorControls>
          <Panel header="Filter">
            <PanelBody title="Categories">
              <div
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(max(50%), 1fr))',
                  display: 'grid'
                }}
              >
                {mixCategories.length > 0 ?
                  mixCategories.map((category, idx) => {
                    // console.log(category, '<<< category filter');
                    return (
                      <CheckboxControl
                        label={category.name}
                        checked={category.value}
                        onChange={(e) => {
                          handleInputChangeFilterCategories(e, category.name, category.id)
                          // console.log(mixCategories);
                        }}
                      />
                    )
                  })
                  :
                  <Spinner
                    style={{
                      width: "calc(4px * 20)",
                      height: "calc(4px * 20)"
                    }}
                  />
                }
              </div>
            </PanelBody>
            <PanelBody title="Author">
              <div
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(max(50%), 1fr))',
                  display: 'grid'
                }}
              >
                {mixAuthors.length > 0 ?
                  mixAuthors.map((author, idx) => {
                    return (
                      <CheckboxControl
                        label={author.name}
                        checked={author.value}
                        onChange={(e) => {
                          handleInputChangeFilterAuthors(e, author.name)
                        }}
                      />
                    )
                  })
                  :
                  <Spinner
                    style={{
                      width: "calc(4px * 20)",
                      height: "calc(4px * 20)"
                    }}
                  />
                }
              </div>
            </PanelBody>
            <PanelBody title="Tag">
              <FormTokenField
                value={tagsFilter}
                suggestions={mixTags}
                onChange={(tokens) => {
                  handleInputChangeFilterTags(tokens)
                }}
              />
            </PanelBody>
          </Panel>
          <Panel header="Grid Setting">
            <PanelBody title="Number of Articles Displayed in Single Row">
              <RangeControl
                label="Article"
                value={sliderNumber === 0 ? 3 : sliderNumber}
                onChange={(value) => {
                  setSliderNumber(value)
                  props.setAttributes({ articleShowNumber: value })
                }}
                min={2}
                max={4}
              />
            </PanelBody>
            {/* <PanelBody title="Has narrow space">
              <CheckboxControl
                label="Narrow space"
                checked={isNarrow}
                onChange={(e) => {
                  setIsNarrow(e)
                  setSliderNumber(2)
                }}
              />
            </PanelBody> */}
          </Panel>
        </InspectorControls>
      </div>
    );
  }

  const GetArticleContentFullDetail = (ArticleData) => {
    const promises = ArticleData.map(async (data) => {
      const ReformatDate = moment(data.date).format("YYYY-MM-DD[T]HH:mm:ss")
      const LastActiveDiscussion = moment(ReformatDate).fromNow()

      const ArticleTags = data.tags.map(async (tag, idx) => {
        try {
          const TagById = await axios.get(GET_TAG_DETAIL_BY_ID(tag))
          const tagResult = {
            name: TagById.data.name,
            link: TagById.data.link,
            id: tag,
            value: true
          }
          return tagResult
        } catch (error) {
          console.log(error);
        }
      })

      const ArticleCategory = data.categories.map(async (category, idx) => {
        try {
          const CategoryByID = await axios.get(GET_CATEGORY_BY_ID(category))
          const categoryResult = {
            name: CategoryByID.data.name,
            link: CategoryByID.data.link,
            id: category,
            value: true
          }
          return categoryResult
        } catch (error) {
          console.log(error);
        }
      })

      let ArticleTagsTemp = []
      let ArticleCategoryTemp = []
      let textOnlyCategory = []
      let textOnlyTags = []
      Promise.all(ArticleTags).then(value => {
        value.map((data) => {
          textOnlyTags.push(data.name)
          ArticleTagsTemp.push(data)
        })

      })

      Promise.all(ArticleCategory).then(value => {
        value.map((data) => {
          textOnlyCategory.push(data.name)
          ArticleCategoryTemp.push(data)
        })
      })

      const ArticleAuthor = await axios.get(GET_AUTHOR_DETAIL_BY_ID(data.author))
      const ArticleCover = await axios.get(GET_ARTICLE_COVER_BY_ID(data.featured_media))
      const result = {
        articleID: data.id,
        title: data.title.rendered,
        link: data.link,
        shortContent: data.excerpt.rendered,
        tags: ArticleTagsTemp,
        // tagIDs: data.tags,
        authorName: LetterCapitalizer(ArticleAuthor.data.name),
        author: LetterCapitalizer(ArticleAuthor.data.name),
        authorLink: ArticleAuthor.data.link,
        authorID: data.author,
        articleCover: ArticleCover.data.media_details.sizes.medium.source_url,
        date: DateConverterClassic(data.date),
        categories: ArticleCategoryTemp,
        categoryIDs: data.categories,
        categoriesSTR: textOnlyCategory,
        tagsSTR: textOnlyTags,
        comments: data.comments_count
      }
      return result
    })

    Promise.all(promises).then(value => {
      setMasterArticles(value)

      // CATEGORIES - temp
      let categories = []
      let duplicatedArrayOfCategory = []
      let uniqueArrayOfCategory = []

      let tempCategoryIDs = []
      let cleanCategoryIDs = []
      let cleanCategoryDetail = []



      // set default filter for authors
      let authors = []
      let tempAuthorIDs = []

      let duplicatedArrayOfAuthor = []
      let uniqueArrayOfAuthor = []


      // set default filter for tags
      let defaultTag = []
      let duplicatedArrayOfTag = []
      let duplicatedArrayOfTagString = []
      let uniqueArrayOfTag = []
      let uniqueArrayOfTagString = []


      value.map((data) => {
        // categories
        data.categoryIDs.map((id) => {
          tempCategoryIDs.push(id)
        })
        data.categories.map((category) => {
          duplicatedArrayOfCategory.push(category)
        })
        cleanCategoryIDs = [...new Set(tempCategoryIDs)]

        // authors
        duplicatedArrayOfAuthor.push({
          name: data.author,
          link: data.authorLink,
          id: data.authorID,
          value: true
        })
        authors.push(data.authorID)

        // tags
        data.tags.map((tag) => {
          duplicatedArrayOfTagString.push(tag.name)
          duplicatedArrayOfTag.push(tag)
        })
      })

      setCategoryIDs(cleanCategoryIDs) // cleanCategoryIDs ✅

      const RemoveDuplicateObj = (objArr) => {
        let result = []
        result = objArr.reduce((unique, o) => {
          if (!unique.some(obj => obj.id === o.id && obj.name === o.name)) {
            unique.push(o);
          }
          return unique;
        }, []);
        return result
      }

      const RemoveDuplicateString = (strArr) => {
        return [...new Set(strArr)]
      }

      // CATEGORIES - setup for default data value
      uniqueArrayOfCategory = RemoveDuplicateObj(duplicatedArrayOfCategory);

      // AUTHORS - setup for default data value
      uniqueArrayOfAuthor = RemoveDuplicateObj(duplicatedArrayOfAuthor);

      // TAGS - setup for default data value
      uniqueArrayOfTagString = RemoveDuplicateString(duplicatedArrayOfTagString);
      uniqueArrayOfTag = RemoveDuplicateObj(duplicatedArrayOfTag);

      setTagsLibrary(uniqueArrayOfTagString)
      setTagsDetailLibrary(uniqueArrayOfTag)
      setCategoryLibrary(uniqueArrayOfCategory)
      setAuthorLibrary(uniqueArrayOfAuthor)

      if (props.attributes.categories === undefined) {
        props.setAttributes({ categories: uniqueArrayOfCategory })
      }

      if (props.attributes.authors === undefined) {
        props.setAttributes({ authors: uniqueArrayOfAuthor })
      }

      if (props.attributes.data === undefined) {
        props.setAttributes({ data: value })
      }

      if (props.attributes.tags === undefined) {
        props.setAttributes({ tags: defaultTag })
      }

      props.setAttributes({ masterData: value })
      props.setAttributes({ tagsWithDetail: uniqueArrayOfTag })
      props.setAttributes({ articleShowNumber: 3 })

      // result from this function

      // uniqueArrayOfAuthor => 
      /**
          1.  attributes to Save Screen
          2.  render filter
       */

      // uniqueArrayOfCategory
      /**
          1.  attributes to Save Screen
          2.  render filter
       */

      ArrayOfTagCategoryAuthor(value)
      console.log(value, '<<< value')
    }) // kalau gak pake promise all dan .then ini, nanti jadinya bakal UVWX 0 null
    // Promise.all(promises).then(value => setArticles(value)) // kalau gak pake promise all dan .then ini, nanti jadinya bakal UVWX 0 null
  }

  const GetArticleContent = async () => { // yang harus di fetch terpisah itu array of tags & author
    try {
      const ArticleData = await axios.get(GET_ARTICLES_FROM_WP)
      return ArticleData.data
    } catch (error) {
      console.log(error, '<<< error get article')
    }
  }

  const RenderPlaceholder = () => {
    return Array(5).fill(1).map((data, idx) => {
      if (idx < 4) {
        return (
          <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <div
              className='article-card-container'
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                marginLeft: idx === 0 ? '0px' : '10px',
                marginRight: idx === 2 ? '0px' : '10px',
                borderWidth: '1px',
                borderColor: PromedikGrey,
              }}
            >
              <div style={{ flex: 1, display: 'flex' }}>
                <div
                  style={{
                    flex: 1,
                    minHeight: '200px',
                    backgroundColor: PromedikLightGrey,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: PromedikDarkGrey
                  }}
                >
                  Article Image
                </div>
              </div>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '10px' }}>
                <div style={{ flex: 1, display: 'flex' }}>
                  <div
                    style={{
                      color: PromedikGreen,
                      fontSize: '28px',
                      lineHeight: 1.5
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ante et huehe
                  </div>
                </div>
                <div style={{ margin: '10px 0px 10px 0px' }}>
                  <div style={{ fontSize: '14px' }}>Posted on 17 June, 2021 by Admin</div>
                  <div style={{ fontSize: '14px' }}>Posted in Perbaikan Sperma - 0 Comments</div>
                </div>
                <div
                  style={{
                    fontSize: '17px',
                    flex: 3,
                    display: 'flex',
                    color: PromedikDarkGrey,
                    marginBottom: '10px'
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sapien nisl, commodo scelerisque odio in.
                </div>
                <div style={{ display: 'flex' }}>
                  <span class="dashicons dashicons-tag"></span>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ marginLeft: '2px', marginRight: '2px' }}>
                      <div style={{ fontSize: '14px', color: PromedikGreen }}>
                        Kesehatan,
                      </div>
                    </div>
                    <div style={{ marginLeft: '2px', marginRight: '2px' }}>
                      <div style={{ fontSize: '14px', color: PromedikGreen }}>
                        Fertilitas,
                      </div>
                    </div>
                    <div style={{ marginLeft: '2px', marginRight: '2px' }}>
                      <div style={{ fontSize: '14px', color: PromedikGreen }}>
                        Pria,
                      </div>
                    </div>
                    <div style={{ marginLeft: '2px', marginRight: '2px' }}>
                      <div style={{ fontSize: '14px', color: PromedikGreen }}>
                        Kebugaran
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
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
      <Slider {...settings}>
        {forum ? RenderPlaceholder() : <p>loading...</p>}
      </Slider>
      {/* <div ref={sliderRef} className="keen-slider" style={{ maxWidth: '100%' }}>
        {forum ? RenderPlaceholder() : <p>loading...</p>}
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
      <div style={{ display: 'flex', flex: 1 }}>
        {/* {forum ? RenderCardForum(forum) : <p>loading...</p>} */}
        {/* {forum ? RenderPlaceholder() : <p>loading...</p>} */}
      </div>
      <div>
        {/* {discussion ? RenderCardDiscussion(discussion) : <p>loading...</p>} */}
      </div>
    </div>
  )
}