import React, { useContext } from 'react';
import { assets } from '../assets';
import classNames from 'classnames';
import { Context } from '../context/Context';
import { Grid } from 'react-loader-spinner';

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, input, setInput } = useContext(Context)

    const cardClasses = "h-52 p-3.5 bg-[#f0f4f9] rounded-xl relative cursor-pointer hover:bg-[#dfe4ea]";
    const cardImageClasses = "w-9 p-1.25 absolute bg-white rounded-3xl bottom-2.5 right-2.5";
    const cardParaClasses = "text-[#585858] text-lg";
    const searchImgClasses = "w-6 cursor-pointer";

    const handleKeyDown = (e) => {

        if (e.key === 'Enter') {
            setInput(e.target.value);
            onSent();
        }
    }

    return (
        <div className='relative flex-1 min-h-screen pb-[15vh]'>
            <div className='flex items-center justify-between text-xl p-4 text-[#585858]'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="user icon" className='rounded-full w-10' />
            </div>
            <div className='max-w-4xl m-auto'>
                {!showResult ?
                    <>
                        <div className='mx-12 my-0 text-6xl text-[#c4c7c5] font-medium p-5'>
                            <p className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'><span>Hello, Dev</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className='grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-3 p-4'>
                            <div onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")} className={classNames(cardClasses)}>
                                <p className={classNames(cardParaClasses)}>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="compass icon" className={classNames(cardImageClasses)} />
                            </div>

                            <div onClick={() => setInput("Briefly explain this topic : urban planning")} className={classNames(cardClasses)}>
                                <p className={classNames(cardParaClasses)}>Briefly explain this topic : urban planning</p>
                                <img src={assets.bulb_icon} alt="bulb icon" className={classNames(cardImageClasses)} />
                            </div>

                            <div onClick={() => setInput("Brainstorm team bonding activities for our work retreat")} className={classNames(cardClasses)}>
                                <p className={classNames(cardParaClasses)}>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="message icon" className={classNames(cardImageClasses)} />
                            </div>

                            <div onClick={() => setInput("Improve the readability of the following code")} className={classNames(cardClasses)}>
                                <p className={classNames(cardParaClasses)}>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="code icon" className={classNames(cardImageClasses)} />
                            </div>
                        </div>
                    </> :
                    <div className='px-0 py-[5%] max-h-[75vh] overflow-y-scroll	no-scrollbar'>
                        <div className='mx-10 my-0 flex items-center gap-5'>
                            <img src={assets.user_icon} alt="user icon" className='w-10 rounded-full' />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='flex items-start gap-5'>
                            <img src={assets.gemini_icon} alt="gemini icon" className='top-0' />
                            {loading ? <Grid
                                height="80"
                                width="80"
                                ariaLabel="comment-loading"
                                wrapperStyle={{}}
                                wrapperClass="comment-wrapper"
                                color="#5598dc"
                                backgroundColor="#F4442E"
                            /> :
                                <p dangerouslySetInnerHTML={{ __html: resultData }} className='text-xl font-light'></p>
                            }
                        </div>
                    </div>
                }


                <div className='absolute bottom-0 w-full max-w-4xl px-0 py-4 m-auto'>
                    <div className='flex items-center justify-between gap-5 bg-[#f0f4f9] px-2.5 py-3 rounded-[50px]'>
                        <input onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} value={input} type="text" placeholder='Enter a prompt here' className='flex-1 bg-transparent border-none outline-none p-2 text-lg' />
                        <div className='flex items-center gap-4'>
                            <img src={assets.gallery_icon} alt="gallery icon" className={classNames(searchImgClasses)} />
                            <img src={assets.mic_icon} alt="mic icon" className={classNames(searchImgClasses)} />
                            {input && <img onClick={() => onSent()} src={assets.send_icon} alt="send icon" className={classNames(searchImgClasses)} />}
                        </div>
                    </div>
                    <p className='text-sm mx-4 my-auto text-center font-light'>Gemini may display inaccurate info, including about people, so double check its responses.</p>
                </div>
            </div>
        </div>
    )
}

export default Main;