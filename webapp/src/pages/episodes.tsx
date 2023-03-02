import Link from "next/link"

export const episodes = [{
    id: 1,
    date: 'Thursday Feb 16, 2023',
    participants: [
        '1CraigMason',
        '1DanielKrawisz',
        '1OwenKellogg',        
    ],
    liveapi_hls_url: 'https://video.liveapi.com/63d46a33f1a83789fcb550b3/vdb88a6be0ae4111ed8a35.mp4/index.m3u8',
    watch_ticket_origin: '215ec0900ebc4ec65b52641e78a016b8c8957e6abe3c8b21e8e1284ce0278270_o2'
}, {
    id: 2,
    date: 'Thursday Feb 23, 2023',
    participants: [
        '1CraigMason',
        '1DanielKrawisz',
        '1iElvis',        
    ],
    liveapi_hls_url: 'https://video.liveapi.com/63d46a33f1a83789fcb550b3/vd03448ce0b3da11edbd43.mp4/index.m3u8'
}, {
    id: 3,
    date: 'Thursday Mar 2, 2023',
    participants: [
        '1CraigMason',
        '1DanielKrawisz',
        '1Ruth'       
    ]
}]

export default function Episodes() {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">
                        Episodes
                    </h1>
                </main>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    {episodes.map((episode) => (
                        <div key={episode.id}>
                            <Link href={`/episodes/${episode.id}`}>
                                <a className="text-6xl font-bold">
                                    Episode {episode.id}
                                </a>
                            </Link>
                        </div>
                    ))}
                </main>
            </div>
        </>
    )
}