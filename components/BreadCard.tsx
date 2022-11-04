import Image from 'next/image';
import { useState } from 'react';
import { useUpdateForm } from 'context/UpdateFormContext';
import { useOverlay } from "context/OverlayContext";

const BreadCard = ({id, owner, image, name, description, expired_date}: IBread) => {
  
    const { setShowForm, setBreadDetail } = useUpdateForm();
  
    const { setShowOverlay } = useOverlay();

    const handleClick = () => {
        setBreadDetail({
            image: image,
            name: name,
            description: description,
            expired_date: expired_date,
            id: id,
            owner: owner
        });
        setShowOverlay(true);
        setShowForm(true);
    }

    return (
    <article
        onClick={() => handleClick()}
        className='cursor-pointer max-w-[300px] md:max-w-[500px] lg:max-w-full w-full min-w-[300px] flex rounded-xl overflow-hidden shadow transition-all duration-300 hover:scale-105'
    >
        <div
            className='relative w-1/2 aspect-square'
        >
            <Image src={image} alt={name} fill className='object-cover' />
        </div>
        <div className='p-2 flex flex-col justify-between'>
            <div>
                <h3 className='text-lg font-semibold max-w-[14ch] sm:max-w-[20ch] text-ellipsis whitespace-nowrap overflow-hidden'>{name}</h3>
                <p className='w-full max-w-[15ch] sm:max-w-[20ch] text-ellipsis whitespace-nowrap overflow-hidden'>{description}</p>
            </div>
            <p>Expired: {expired_date}</p>
        </div>
    </article>
  );
}

export default BreadCard;