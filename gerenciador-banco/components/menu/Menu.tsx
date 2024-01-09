
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { To } from "react-router";
import { ModeToggle } from '@/components/themeProvider/ThemeChaveador'

import { BellIcon, GearIcon, HomeIcon, Pencil2Icon, RulerSquareIcon, StarFilledIcon } from "@radix-ui/react-icons"

import { ScrollArea } from '../ui/scroll-area';
import { Label } from '../ui/label';


type menuItensType = [];
interface menuItensProps {
    id: any,
    title: String,
    listItems: [{
        url: To,
        id: any | String | Number,
        title: String,
    }]
}


const Menu = () => {
    const [menuItens, setMenuItens] = useState<menuItensType>([]);

    const [rotaCorrente, setRotaCorrente] = useState("");



    return (
        <div className=" flex flex-col justify-between w-[100px] h-[calc(100bh-100px)] rounded-xl dark:bg-gray-800 bg-slate-500 m-2" >
            <ScrollArea className="w-[100px] h-[calc(100vh-100px)] pt-6">

                <div className='w-full flex flex-col items-center justify-center'>
                    <Link
                        href={"/setor/admin"}
                        className='w-full'
                    >
                        <div className="flex flex-col justify-center items-center gpa-x-4 mb-4 pt-2 hover:bg-slate-600  w-full" >
                            <StarFilledIcon className='h-[2.2rem] w-[2.2rem]'></StarFilledIcon>
                            <Label className=" uppercase p-2 font-light text-[9px]">ADM</Label>
                        </div>
                    </Link>



                </div>

            </ScrollArea>
            <div className='flex flex-col items-center p-2'><ModeToggle ></ModeToggle></div>
        </div>
    );
};

export default Menu;