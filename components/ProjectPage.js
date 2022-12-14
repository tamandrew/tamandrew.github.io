import { useEffect, useRef, useState } from 'react';


const ProjectPage = (props) => {
    const vidRef = useRef(null)
    const [currentActive, setCurrentActive] = useState(0)

    useEffect(() => {

        const interval = setInterval(() => {
            const currentTime = vidRef.current.currentTime

            for (let i = props.features.length - 1; i >= 0; i--) {
                if (currentTime >= props.features[i].time) {
                    setCurrentActive(i)
                    break
                }
            }
        }, 100)

        return () => {
            clearInterval(interval)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="text-black text-semibold font-sans text-center">
            <div className={`text-center p-4 font-semibold mb-8 ${props.bkColor}`}>
                <a target="_blank" rel="noreferrer" href={props.link}><h1 className="text-3xl">{props.title}</h1></a>

                <a className="text-sky-700" href={props.github} target="_blank" rel="noreferrer">
                    GitHub Repository
                </a>
            </div>



            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 rounded mx-2 md:mx-16`}>
                <video ref={vidRef} autoPlay={true} controls = {true} className={`mx-auto w-full p-1 rounded-xl lg:my-auto my-2 ${props.bkColor}`}>
                    <source src={props.src} type="video/mp4" />
                </video>


                <div className={`p-4 my-10 rounded-xl md:w-4/5 mx-auto ${props.bkColor}`}>
                    <p className="text-2xl text-center"> Feature Overview </p>
                    <p className="text-sm text-gray-800 text-center mb-2"> Click on a feature to jump to that part of the video</p>

                    <ul className="px-5">
                        {props.features.map((feature, i) =>
                        (
                            <li
                                className={`py-1 list-disc cursor-pointer text-left ${currentActive === i ? "text-red-800" : "text-black"}`}
                                key={i}
                                onClick={() => {
                                    vidRef.current.currentTime = feature.time
                                    setCurrentActive(i)
                                }}
                            >
                                {feature.caption}
                            </li>
                        )
                        )}

                    </ul>
                </div>
            </div>

        </div>
    )

}

export default ProjectPage