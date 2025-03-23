import React from 'react';
import { ToasterProps } from '../types/Toaster.type';
import { InfoIcon } from './icons/InfoIcon';
export const Toaster: React.FC<ToasterProps> = ({
    message: { title, subtitle, content, caption, color },
}) => {

    const textClass = `${color}`;

    return (
        <div className={`flex items-start pt-2 px-1 ${textClass}`}>

            <InfoIcon width="20" height="20" />

            <div className='ml-2 -mt-0.5'>
                <p className='font-semibold text-base'>{title}</p>

                {
                    caption &&
                    <p className='font-bold text-xl'>{caption}</p>
                }

                {
                   ( content || subtitle) &&
                    <div className='flex gap-2 flex-wrap my-3 justify-between text-sm'>

                        {
                            subtitle &&
                            <p className='italic max-w-[150px] truncate'>{subtitle}</p>
                        }
                        {
                            content &&
                            <p className='font-bold text-right'>{content}</p>
                        }
                    </div>

                }
            </div>
        </div>
    );
};
