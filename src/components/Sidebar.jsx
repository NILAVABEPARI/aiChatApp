import React, { useContext, useState } from 'react';
import { assets } from '../assets';
import { Context } from '../context/Context';

const Sidebar = () => {
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
    const [extended, setExtended] = useState(true);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className='min-h-[100vh] inline-flex flex-col justify-between bg-[#f0f4f9] px-3 py-3'>
            <div>
                <img onClick={() => setExtended(!extended)} src={assets.menu_icon} alt="menu icon" className='w-5 cursor-pointer ml-2.5 block' />
                <div onClick={() => newChat()} className='inline-flex items-center mt-10 px-2 py-3 bg-[#e6eaf1] text-sm text-gray-500 cursor-pointer rounded-[50px]'>
                    <img src={assets.plus_icon} alt="plus icon" className='w-5' />
                    {extended && <p className='pl-2'>New Chat</p>}
                </div>

                {extended &&
                    <div className='flex flex-col'>
                        <p className='mt-6 mb-4'>Recent</p>
                        {
                            prevPrompts.map((item, index) => {
                                return (
                                    <div onClick={() => loadPrompt(item)} className='flex items-start gap-2 p-2 pr-8 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                                        <img src={assets.message_icon} alt="message icon" className='w-5' />
                                        <p>{item.slice(0, 18)} {item.length > 18 ? "..." : ""}</p>
                                    </div>
                                )
                            })
                        }

                    </div>
                }
            </div>
            <div className='flex flex-col'>
                <div className='flex items-start gap-2 p-2 pr-8 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                    <img src={assets.question_icon} alt="question icon" className='w-5' />
                    {extended && <p>Help</p>}
                </div>
                <div className='flex items-start gap-2 p-2 pr-8 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                    <img src={assets.history_icon} alt="history icon" className='w-5' />
                    {extended && <p>Activity</p>}
                </div>
                <div className='flex items-start gap-2 p-2 pr-8 rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]'>
                    <img src={assets.setting_icon} alt="settings icon" className='w-5' />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
