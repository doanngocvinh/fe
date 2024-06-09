"use client";
import { useSession } from 'next-auth/react';
import AboutVideo from "@/components/Introduction/AboutVideo";
import SampleStyles from "@/components/Introduction/SampleStyles";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ScissorsIcon, CubeTransparentIcon } from "@heroicons/react/20/solid";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') return <p>Loading...</p>;

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }
  
  return (
    <div className="max-w-screen-2xl ">
      <div className="grid grid-cols-4 mx-auto bg-slate-100 gap-4">
        <div className="relative rounded-lg col-span-1 bg-white overflow-hidden">
          <AboutVideo />
        </div>
        <div className="col-span-3 grid grid-cols-2 rounded-lg bg-white">
          <div className="col-span-1 p-4">
            <div className="text-2xl mb-3 font-base">
              Select a template to get started !
            </div>
            <div className="font-light mb-3">
              Browse our collection of free customizable templates, and start
              editing your video
            </div>
            <Link href={""}>
              <div
                className="inline-block bg-gradient-to-r from-[#E92762] via-[#9E8DBC] to-[#C9C9C9]
              p-2 text-white rounded-lg
              hover:opacity-50  
            hover:text-violet-900
              duration-300"
              >
                <span className="flex items-center space-x-2">
                  <div>Explore now</div>
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </div>
          <div className="relative w-full col-span-1 rounded-r-lg overflow-hidden">
            <SampleStyles />
          </div>
        </div>
      </div>
      <div>
        <div className="mt-5 font-light text-xl">Create your Project!</div>
        <div className="mt-5 grid grid-cols-4 gap-6">
          <Link
            href={"/editor"}
            className="flex items-center p-3 rounded-lg col-span-1 
          bg-white text-black gap-3 
          hover:bg-slate-200
          hover:text-[#E3356B]
          hover:border
          hover:border-[#E3356B]
          duration-100"
          >
            <ScissorsIcon className="bg-[#fbe3ea] text-[#E3356B] w-9 h-9 p-1"></ScissorsIcon>
            <div className="font-light">Edit Video</div>
          </Link>
          <Link
            href={"ai"}
            className="flex items-center p-3 rounded-lg col-span-1 
            bg-white text-black gap-3
            hover:bg-slate-200

          hover:text-violet-900
          hover:border
          hover:border-violet-900
          duration-100"
          >
            <CubeTransparentIcon className="bg-[#f1ebf2] text-[#A884B3] w-9 h-9 p-1"></CubeTransparentIcon>
            <div className="font-light">AI Model training</div>
          </Link>
        </div>
      </div>
      <div>
        <div className="mt-5 font-light text-xl">Recent Video</div>
      </div>
    </div>
  );
}
