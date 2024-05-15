import { FC } from "react"
import { MdMusicNote } from "react-icons/md";
import { MdMusicOff } from "react-icons/md";
import { IoVolumeHigh } from "react-icons/io5";
import { IoMdVolumeOff } from "react-icons/io";
import { ISound } from "../../models/settings";
import { useSoundStore } from "../../Zustand/soundStore";

export const HomeSettings:FC<any> = (props):JSX.Element => {

    const { music, sounds,ref, changeSettings}:ISound = useSoundStore()

    const handleOnMusic = () => {
        changeSettings(true, sounds,ref)
    }

    const handleOffMusic = () => {
        changeSettings(false, sounds,ref)
    }

    const handleOffVolume = () => {
        changeSettings(music, false,ref)
    }

    const handleOnVolume = () => {
        changeSettings(music, true,ref)
    }


    return (
        <div className="flex justify-around w-20 absolute top-2 right-2">
            {
                music?
                <MdMusicNote onClick={handleOffMusic}  className="border p-1 rounded-full border-white bg-amber-500 text-indigo-800 " size={35}  />
                :
                <MdMusicOff onClick={handleOnMusic}  className="border p-1 rounded-full border-white bg-amber-500 text-indigo-800 " size={35}  />
            }
            {
                sounds?
                <IoVolumeHigh onClick={handleOffVolume}  className="border p-1 rounded-full border-white bg-amber-500 text-indigo-800 " size={35}  />
                :
                <IoMdVolumeOff onClick={handleOnVolume}  className="border p-1 rounded-full border-white bg-amber-500 text-indigo-800 " size={35}  />
            }
        </div>
    )
}