import React from 'react'
import { PromedikDarkGrey, PromedikGreen, PromedikGrey, PromedikLightGrey } from '../../statics'

export const PromedikArticleSave = ({ props }) => {
    const { attributes: { data, isHideAvatar } } = props

    const RenderPlaceholder = (articles) => {
        return articles.map((data, idx) => {
            if (idx < 4) {

                return (
                    <div
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sapien nisl, commodo scelerisque odio in, faucibus volutpat mi. Nullam et feugiat arcu. Morbi ultricies efficitur lacus sed sodales. Morbi a gravida nisl. Vestibulum tincidunt varius neque id hendrerit. Aliquam erat volutpat. Ut laoreet mi et hendrerit tincidunt.
                            </div>
                            {/* <div style={{ display: 'flex' }}>
                                <span class="dashicons dashicons-tag"></span>
                                <div style={{ display: 'flex' }}>
                                    {data.tags.map((datum, idx) => {
                                        if (idx !== data.tags.length - 1) {
                                            return (
                                                <div style={{ marginLeft: '2px', marginRight: '2px' }}>
                                                    <a style={{ textDecoration: 'none' }} href={datum.link}>
                                                        {datum.name}
                                                    </a>
                                                    ,
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div style={{ marginLeft: '2px', marginRight: '2px' }}>
                                                    <a style={{ textDecoration: 'none' }} href={datum.link}>
                                                        {datum.name}
                                                    </a>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            </div> */}
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
            <div style={{ display: 'flex', flex: 1 }}>
                {data.length > 0 ? RenderCardForum(data) : <div><p>loading...</p></div>}
            </div>
        </div>
    )
}