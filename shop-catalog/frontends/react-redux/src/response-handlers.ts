import ZenCore from "@zenflux/core";

export const setResponseHandlers = () => {
    const textFilter: ZenCore.interfaces.TResponseFilterCallbackType = ( text: string ) => {
        let written = null;

        const textAtEnd = text.at( -1 );

        if ( typeof textAtEnd === "undefined" ) {
            return text;
        }

        // Handle issue with PHP fatal errors, when response comes with json and text together.
        if ( ! [ "}", "]" ].includes( textAtEnd ) ) {
            written = "";

            let shouldReadLevel = 0;

            for ( let i = 0; i < text.length; i++ ) {
                const chr = text.at( i );

                if ( "{" === chr ) {
                    shouldReadLevel++;
                } else if ( "}" === chr ) {
                    shouldReadLevel--;
                }

                if ( ! shouldReadLevel ) {
                    written += chr;
                    break;
                }

                if ( shouldReadLevel ) {
                    written += chr;
                }
            }
        }

        return written || text;
    };

    const responseHandler: ZenCore.interfaces.TResponseHandlerCallbackType = ( data: any ) => {
        if ( data?.error && ( "undefined" !== typeof data?.type || "undefined" !== typeof data?.code ) ) {
            throw data;
        }

        return false;
    };

    ZenCore.managers.data.setHandler( ZenCore.interfaces.E_RESPONSE_HANDLER_TYPE.RESPONSE_FILTER, textFilter );
    ZenCore.managers.data.setHandler( ZenCore.interfaces.E_RESPONSE_HANDLER_TYPE.RESPONSE_HANDLER, responseHandler );
};
