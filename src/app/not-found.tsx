import { JSX } from "react"
import NotFoundContent from '@/components/not-found/NotFoundContent';

export default function GlobalNotFoundPage(): JSX.Element {
    return (
        <NotFoundContent
            title="404 - Page Not Found"
            description="The page you are looking for doesn't exist or has been moved."
            suggestions={{
                title: "What can you do?",
                items: [
                    "Check the URL for typos",
                    "Visit our homepage"
                ]
            }}
            actions={{
                goHome: "Go Home",
                goBack: "Go Back",
            }}
            homeUrl="/en"
            searchUrl="/en/search"
            contactUrl="/en/contact"
        />
    )
}