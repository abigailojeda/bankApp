import React from 'react';
import { ToasterProps } from '../types/Toaster.type';
import { InfoIcon } from './icons/InfoIcon';
export const Toaster: React.FC<ToasterProps> = ({
    message,
}) => {

    const textClass = `${message.color}`;

    return (
        <div className={`flex flex-col ${textClass}`}>

            <div className="flex items-center">
                <InfoIcon width="20" height="20" />
                <h4 className='ml-2 font-semibold'>{message.title}</h4>
            </div>

            <div className='flex'>

                {
                    message.subtitle &&
                    <p className='italic'>{message.subtitle}</p>
                }
                {
                    message.content &&
                    <p className='font-bold'>{message.content}</p>
                }
            </div>
        </div>
    );
};
