import { Inter } from "next/font/google";
import "@app/styles/globals.sass";
import { AuthProvider } from "@app/context/AuthContext";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "骨諺云",
    description: "建立互動塔位　傳承精彩一生",
};

export default function RootLayout({ children }) {
    return (
            <html lang="en">
                <body>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </body>
            </html>
    );
}
