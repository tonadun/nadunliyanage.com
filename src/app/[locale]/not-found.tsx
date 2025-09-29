import { JSX } from "react"
import { useTranslations } from 'next-intl';
import NotFoundContent from '@/components/not-found/NotFoundContent';

export default function LocalizedNotFoundPage(): JSX.Element {
    const t = useTranslations('NotFound');

    return (
        <NotFoundContent
            title={t('title')}
            description={t('description')}
            suggestions={{
                title: t('suggestions.title'),
                items: [
                    t('suggestions.checkUrl'),
                    t('suggestions.visitHome')
                ]
            }}
            actions={{
                goHome: t('actions.goHome'),
                goBack: t('actions.goBack'),
            }}
            homeUrl="/"
            searchUrl="/search"
            contactUrl="/contact"
        />
    )
}