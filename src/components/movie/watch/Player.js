"use client"

import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {memo, useEffect, useRef, useState} from "react";
import ContinueWatchingApi from "@/api/continueWatching.api";
import {
    resetWatchData, setClickedEpisode,
    setCurEpisodeNumberPlayer,
    setCurSeasonNumberPlayer, setCurVersion,
    setCurVersionPlayer
} from "@/redux/features/movieSlice";
import useVersionUpdater from "@/hooks/useVersionUpdater";
import useGetCwInfo from "@/hooks/useGetCwInfo";
import {useSearchParams} from "next/navigation";
import {playerPostMessage} from "@/utils/helpers"
import UserApi from "@/api/user.api";
import PlayerApi from "@/api/player.api";

const MoviePlayer = ({movie}) => {
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const [showNotice, setShowNotice] = useState(true)
    const [playerUrl, setPlayerUrl] = useState(null)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const playerTimeRef = useRef(0)
    const lastTimeLogRef = useRef(0)
    const playerDurationRef = useRef(0)
    const {
        curSeason,
        curEpisode,
        curVersion,
        cwInfo,
        cwInfoLoading,
        clickedEpisode,
    } = useAppSelector(state => state.movie)
    const {loggedUser} = useAppSelector(state => state.auth)
    const intervalRef = useRef(null)

    useVersionUpdater({movie, page: "watch"})
    useGetCwInfo({movie})

    useEffect(() => {
        playerTimeRef.current = 0;
        lastTimeLogRef.current = 0;
    }, [curEpisode])

    useEffect(() => {
        return () => {
            dispatch(resetWatchData())
        }
    }, [])

    useEffect(() => {
        const continueWatchingLog = async () => {
            if (playerTimeRef.current > 0 && playerTimeRef.current > lastTimeLogRef.current) {
                lastTimeLogRef.current = playerTimeRef.current
                await ContinueWatchingApi.save({
                    movie_id: movie._id,
                    season_number: curSeason?.season_number,
                    episode_number: curEpisode?.episode_number,
                    version: curVersion,
                    time: playerTimeRef.current,
                    duration: playerDurationRef.current,
                })
            }
        }

        if (loggedUser && !loggedUser.is_shared) {
            intervalRef.current = setInterval(() => {
                continueWatchingLog()
            }, 10000)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [loggedUser, curEpisode, curSeason, curVersion]);

    const buildPlayerUrl = async () => {
        const link = await PlayerApi.getLink(movie.public_id)

        let queryParams = []

        if (searchParams.get("dddeeebbbuuuggg")) {
            queryParams.push("dddeeebbbuuuggg=3")
        }

        if (curVersion) queryParams.push(`version=${curVersion}`)
        if (movie.type !== 1) {
            if (curSeason) queryParams.push(`season=${curSeason.season_number}`)
            if (curEpisode) queryParams.push(`episode=${curEpisode.episode_number}`)
            if (
                cwInfo &&
                cwInfo.season_number === curSeason?.season_number &&
                cwInfo.episode_number === curEpisode?.episode_number
            ) {
                queryParams.push(`time=${cwInfo.time}`)
            }
        } else {
            if (cwInfo) queryParams.push(`time=${cwInfo.time}`)
        }

        return `${link}${queryParams.length > 0 ? `&${queryParams.join("&")}` : ""}`
    }


    useEffect(() => {
        const initPlayerUrl = async () => {
            if (!cwInfoLoading && isFirstLoad) {
                const canBuild =
                    (movie.type === 1 && curVersion) ||
                    (movie.type !== 1 && curEpisode)

                if (canBuild) {
                    const url = await buildPlayerUrl()
                    setPlayerUrl(url)
                    setIsFirstLoad(false)
                }
            }
        }

        initPlayerUrl()
    }, [curEpisode, cwInfoLoading, cwInfo, curVersion, loggedUser]);

    const prevRef = useRef({version: null, episode: null, season: null});

    useEffect(() => {
        if (!curVersion || isFirstLoad) return;

        const dddebug = searchParams.get("dddeeebbbuuuggg");
        const hasDebug = dddebug ? `&dddeeebbbuuuggg=3` : "";

        const prev = prevRef.current;

        if (movie.type === 1) {
            if (curVersion !== prev.version) {
                window.history.replaceState({}, "", `?ver=${curVersion}${hasDebug}`);
            }
        }

        if (movie.type !== 1 && curEpisode && curSeason) {
            const episodeChanged = prev.episode !== curEpisode.episode_number;

            if (episodeChanged || clickedEpisode) {
                window.history.replaceState(
                    {},
                    "",
                    `?ver=${curVersion}&ss=${curSeason.season_number}&ep=${curEpisode.episode_number}${hasDebug}`
                );
                dispatch(setClickedEpisode(false))
            }
        }

        prevRef.current = {
            version: curVersion,
            episode: curEpisode?.episode_number,
            season: curSeason?.season_number,
        };
    }, [curVersion, curEpisode, curSeason, isFirstLoad, clickedEpisode]);

    useEffect(() => {
        const saveSettings = async (data) => {
            await UserApi.saveSettings(data)
        }

        const handleEventMessage = (event) => {
            if (event.origin === "https://goatembed.com") {
                const eventData = event.data
                if (eventData.event === "time") {
                    playerTimeRef.current = eventData.param.time
                    playerDurationRef.current = eventData.param.duration
                }
                if (eventData.event === "change_episode") {
                    const {season, episode} = eventData.param
                    // console.log('player change season: ', season)
                    // console.log('player change episode: ', episode)
                    dispatch(setCurSeasonNumberPlayer(season))
                    dispatch(setCurEpisodeNumberPlayer(episode))
                }
                if (eventData.event === "change_audio") {
                    const {version} = eventData.param
                    // console.log('player change version: ', version)
                    dispatch(setCurVersionPlayer(version))
                    dispatch(setCurVersion(version))
                }
                if (eventData.event === "player_update_settings") {
                    // console.log('player update settings: ', eventData.param)
                    if (loggedUser) {
                        saveSettings({web_player: eventData.param})
                    }
                }
                if (eventData.event === "player_get_settings") {
                    if (loggedUser && loggedUser.settings.web_player) {
                        playerPostMessage({event: "web_get_settings", param: loggedUser.settings.web_player})

                        if (typeof loggedUser.settings?.auto_skip_intro !== "undefined") {
                            playerPostMessage({
                                event: "web_auto_skip_intro",
                                param: loggedUser.settings?.auto_skip_intro
                            })
                        }

                        if (typeof loggedUser.settings?.auto_next !== "undefined") {
                            playerPostMessage({event: "web_auto_next_episode", param: loggedUser.settings?.auto_next})
                        }
                    }
                }
            }
        }

        window.addEventListener("message", handleEventMessage)

        return () => {
            window.removeEventListener("message", handleEventMessage)
        }
    }, [loggedUser]);

    return (
        <div className="ratio ratio-16x9">
            {(movie.quality === "cam" && showNotice) && <div className="quality-notice">
                <div className="text">
                    <strong>Chú ý:</strong> Chất lượng phim chưa tốt. Rổ sẽ cập nhật bản đẹp sớm nhất có thể nhé.
                </div>
                <div className="notice-dismiss" onClick={() => setShowNotice(false)}>Ẩn thông báo</div>
            </div>}
            <iframe width="560" height="315"
                    src={playerUrl} id={`embed-player`}
                    allow="autoplay; encrypted-media; picture-in-picture;"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen webkitallowfullscreen="true"
                    mozallowfullscreen="true"></iframe>
        </div>
    )
}

export default memo(MoviePlayer)