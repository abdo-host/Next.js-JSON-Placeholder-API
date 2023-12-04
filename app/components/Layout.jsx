"use client";

import {Provider} from 'react-redux';
import LoadingBar from 'react-redux-loading-bar'
import {usePathname} from 'next/navigation'
import {Navbar} from "@/app/components/Navbar";
import {HeroSection} from "@/app/components/HeroSection";
import store from "@/redux/store"

export function Layout(props) {
    const pathname = usePathname();
    return (
        <>
            <Provider store={store}>
                <LoadingBar style={{ backgroundColor: '#6366F1', height: '2px' }}/>
                <Navbar pathname={pathname}></Navbar>
                {pathname == '/' && <HeroSection></HeroSection>}
                <div style={{minHeight: 'calc(100vh - 169px)'}}>
                    {props.children}
                </div>
                <div className="bg-white py-10 text-center">
                    © 2023 <a href="https://www.tatwerat.com">Tatwerat Team</a> . All rights reserved.
                </div>
            </Provider>
        </>
    )
}
