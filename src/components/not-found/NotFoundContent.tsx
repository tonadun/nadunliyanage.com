'use client'

import { JSX } from "react"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';

interface NotFoundContentProps {
    title: string;
    description: string;
    suggestions: {
        title: string;
        items: string[];
    };
    actions: {
        goHome: string;
        goBack: string;
    };
    homeUrl?: string;
    searchUrl?: string;
    contactUrl?: string;
}

export default function NotFoundContent({
    title,
    description,
    suggestions,
    actions,
    homeUrl = '/en',
    searchUrl = '/en/search',
    contactUrl = '/en/contact'
}: NotFoundContentProps): JSX.Element {
    const router = useRouter();

    const handleGoBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push(homeUrl);
        }
    };

    return (
        <main
            role="main"
            className="flex min-h-screen w-full bg-error-foreground justify-center items-center p-4 sm:p-6 lg:p-8"
        >
            <section
                aria-labelledby="error-title"
                className="
                    w-full max-w-md sm:max-w-lg lg:max-w-xl
                    min-h-[20rem] sm:min-h-[24rem] lg:min-h-96
                    bg-surface text-surface-foreground
                    border border-border
                    rounded-lg sm:rounded-xl
                    p-6 sm:p-8 lg:p-10
                    shadow-sm sm:shadow-md lg:shadow-lg
                "
            >
                <header className="mb-4 sm:mb-6">
                    <h1
                        id="error-title"
                        className="
                            text-2xl sm:text-3xl lg:text-4xl
                            font-bold
                            text-destructive
                            mb-2
                        "
                    >
                        {title}
                    </h1>
                </header>

                <div role="region" aria-labelledby="error-description" className="mb-6 sm:mb-8">
                    <p
                        id="error-description"
                        className="
                            text-sm sm:text-base lg:text-lg
                            text-muted
                            leading-relaxed
                        "
                    >
                        {description}
                    </p>
                </div>

                <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg font-semibold mb-3 text-surface-foreground">
                        {suggestions.title}
                    </h2>
                    <ul className="space-y-2 text-sm text-muted">
                        {suggestions.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                        ))}
                    </ul>
                </div>

                <nav aria-label="Error page actions" role="navigation">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Link href={homeUrl}>
                            <Button variant="default" size="lg" className="w-full sm:w-auto">
                                <Home className="mr-2 h-4 w-4" />
                                {actions.goHome}
                            </Button>
                        </Link>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleGoBack}
                            className="w-full sm:w-auto"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {actions.goBack}
                        </Button>
                    </div>
                </nav>
            </section>
        </main>
    )
}