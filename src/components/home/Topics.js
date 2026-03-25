"use client"

import {memo, useEffect} from "react";
import CustomLink from "@/components/shared/CustomLink";
import {collectionUrl} from "@/utils/url";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {fetchTopics} from "@/redux/features/collectionSlice";

const HomeTopics = () => {
    const dispatch = useAppDispatch()

    const {topics, moreTopics} = useAppSelector((state) => state.collection)

    useEffect(() => {
        if (topics.length === 0) {
            dispatch(fetchTopics())
        }
    }, [])

    if (topics.length > 0)
        return (
            <div className="cards-row wide">
                <div className="row-header">
                    <h3 className="category-name">Bạn đang quan tâm gì?</h3>
                </div>
                <div className="row-content">
                    <div className="topics-list topics-grid topics-line mt-0">
                        {topics.map((topic) => {
                            return (
                                <CustomLink href={collectionUrl(topic)} className="row-topic"
                                            key={`h-topic-${topic._id}`}>
                                    <div className="mask"
                                         style={{backgroundColor: `${topic.color || "#1d2e79"}`}}></div>
                                    <div className="intro">
                                        <div className="heading-md lim-2 mb-0">{topic.name}</div>
                                        <div className="info">
                                            <div className="btn btn-sm btn-outline">
                                                <span>Xem chủ đề</span>
                                                <i className="fa-solid fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </CustomLink>
                            )
                        })}
                        {moreTopics > 0 && <CustomLink href="/chu-de" className="row-topic more-topic p-3">
                            <div className="mask" style={{backgroundColor: `#2e3245`}}></div>
                            <div className="intro justify-content-center align-items-center">
                                <div className="heading-md mb-0">+{moreTopics} chủ đề</div>
                            </div>
                        </CustomLink>}
                    </div>
                </div>
            </div>
        )
}

export default memo(HomeTopics)