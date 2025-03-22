import React from 'react';
import { ToasterProps } from '../types/Toaster.type';
import { InfoIcon } from './icons/InfoIcon';
export const Toaster: React.FC<ToasterProps> = ({
    message,
}) => {

    const textClass = `${message.color}`;

    return (
        <div className={`flex items-start pt-2 px-1 ${textClass}`}>

            <InfoIcon width="20" height="20" />



            <div className='ml-2 -mt-0.5'>
                <p className='font-semibold text-base'>{message.title}</p>

                <div className='flex gap-2 flex-wrap my-3 justify-between text-sm'>

                    {
                        message.subtitle &&
                        <p className='italic max-w-[150px] truncate'>{message.subtitle}</p>
                    }
                    {
                        message.content &&
                        <p className='font-bold text-right'>{message.content}</p>
                    }
                </div>
            </div>
        </div>
    );
};
