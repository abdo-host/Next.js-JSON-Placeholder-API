import './globals.scss'
import {Cairo} from 'next/font/google'
import {Layout} from "@/app/components/Layout";
import Script from "next/script";

const cairoFont = Cairo({subsets: ['arabic']})

export const metadata = {
    title: 'Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({children}) {
    return (
        <html dir="ltr" lang="en">
        <body className={cairoFont.className}>
        <div className="min-h-full">
            <Layout children={children}></Layout>
        </div>
        <Script src="/plugins/bootstrap/bootstrap.bundle.js"></Script>
        <Script src="/plugins/jquery/jquery.min.js"></Script>
        <Script src="/js/app.js"></Script>
        </body>
        </html>
    )
}
