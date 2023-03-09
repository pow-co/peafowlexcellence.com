import Link from "next/link"
import { useEffect, useState } from "react"
import ThreeColumnLayout from "src/components/ThreeColumnLayout"

export default function Episodes() {

  const [loading, setLoading] = useState(true)

  const [episodes, setEpisodes] = useState<any[]>([])

  useEffect(() => {

    fetch(`https://tokenmeet.live/api/v1/shows/peafowl-excellence`)
      .then(res => res.json())
      .then(res => {

        console.log('show.episodes', res)

        setEpisodes(res.episodes)

        setLoading(false)

      })

  }, [])

    return (
        <>
            <ThreeColumnLayout>

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">
                        Episodes
                    </h1><br/>
                    {loading && <div>Loading...</div>}
                    {!loading && episodes.map((episode, index) => (
                        <div key={index +1}>
                            <Link href={`/episodes/${index + 1}`}>
                                <a className="text-5xl">
                                    Episode {index+1}
                                </a>
                            </Link>
                        </div>
                    ))}
                </main>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

                </main>
            </div>
            </ThreeColumnLayout>

        </>
    )
}