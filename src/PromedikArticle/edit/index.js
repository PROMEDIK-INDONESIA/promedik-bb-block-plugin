import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GET_ARTICLES_FROM_WP, GET_ARTICLE_COVER_BY_ID, GET_AUTHOR_DETAIL_BY_ID, GET_CATEGORY_BY_ID, GET_DISCUSSION, GET_FORUMS, GET_MEMBER_AVATAR, GET_TAG_DETAIL_BY_ID } from '../../statics/API'
import { PromedikDarkGrey, PromedikGreen, PromedikGrey, PromedikLightGrey } from '../../statics'
import {
    InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';
import { Panel, PanelBody, CheckboxControl, SelectControl } from '@wordpress/components';
import moment from 'moment'
import { Dashicon } from '@wordpress/components';
import { useKeenSlider } from "keen-slider/react"
// import "keen-slider/keen-slider.min.css"

export const PromedikArticleEdit = ({ props }) => {

    useEffect(() => {
        GetArticleContent().then(value => GetArticleContentFullDetail(value))
    }, [])

    const [articles, setArticles] = useState([])
    const [forum, setForum] = useState([])
    const [sliderRef] = useKeenSlider({
        loop: false,
        mode: "free",
        slides: {
            perView: 4,
            spacing: 15,
        },
    })

    const BlockSetting = () => {
        return (
            <div {...useBlockProps()}>
                <InspectorControls>
                    <Panel header="Card Setting">

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
                        link: TagById.data.link
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
                        link: CategoryByID.data.link
                    }
                    return categoryResult
                } catch (error) {
                    console.log(error);
                }
            })

            let ArticleTagsTemp = []
            let ArticleCategoryTemp = []
            Promise.all(ArticleTags).then(value => ArticleTagsTemp = value)
            Promise.all(ArticleCategory).then(value => ArticleCategoryTemp = value)
            const ArticleAuthor = await axios.get(GET_AUTHOR_DETAIL_BY_ID(data.author))
            const ArticleCover = await axios.get(GET_ARTICLE_COVER_BY_ID(data.featured_media))
            const result = {
                title: data.title.rendered,
                link: data.link,
                shortContent: data.excerpt.rendered,
                tags: ArticleTagsTemp,
                author: ArticleAuthor.data.name,
                articleCover: ArticleCover.data.media_details.sizes.medium.source_url,
                date: LastActiveDiscussion,
                categories: ArticleCategoryTemp
            }
            return result
        })
        Promise.all(promises).then(value => console.log(value, '<<< value')) // kalau gak pake promise all dan .then ini, nanti jadinya bakal UVWX 0 null
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
                    <div
                        className='keen-slider__slide'
                        style={{
                            borderRadius: '10px',
                            overflow: 'hidden',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: idx === 0 ? '0px' : '10px',
                            marginRight: idx === 2 ? '0px' : '10px',
                            borderWidth: '1px',
                            borderColor: PromedikGrey
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
            <div ref={sliderRef} className="keen-slider" style={{ maxWidth: '100%' }}>
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
            </div>
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