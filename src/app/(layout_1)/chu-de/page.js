import CollectionApi from "@/api/collection.api";
import Link from "next/link";
import {collectionUrl} from "@/utils/url";

export async function generateMetadata({params}) {
    return {
        title: `Chủ đề`
    }
}

const CollectionPage = async () => {
    const {result: topics} = await CollectionApi.allTopics()

    return (
        <div id="wrapper" className="makeup">
            <div className="fluid-gap">
                <div className="cards-row wide">
                    <div className="row-header">
                        <h3 className="category-name me-3">Các chủ đề</h3>
                    </div>
                    <div className="row-content">
                        <div className="topics-list topics-grid">
                            {topics.map((topic) => {
                                return (
                                    <Link href={collectionUrl(topic)} className="row-topic" key={`t-${topic._id}`}>
                                        <div className="mask"
                                             style={{backgroundColor: `${topic.color || "#1d2e79"}`}}></div>
                                        <div className="intro">
                                            <div className="heading-md lim-2 mb-0">{topic.name}</div>
                                            <div className="info">
                                                <div className="btn btn-sm btn-outline">
                                                    <span>Xem toàn bộ</span>
                                                    <i className="fa-solid fa-angle-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionPage