

import QuoteWidgetClient from "../../../components/QuoteWidgetClient";

export default async function QuoteWidgetPage(props: {
    searchParams: Promise<Record<string, string>>;
}) {
    const searchParams = await props.searchParams;

    return (
        <QuoteWidgetClient
            themeNumber={searchParams.themeNumber}

        />
    );
}
