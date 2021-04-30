export const CK_EDITOR_CONDIG = {
    toolbar: {
        items: [
            'bold',
            'code',
            'numberedList',
            'bulletedList',
            'blockQuote',
            'codeBlock',
            '|',
            'undo',
            'redo'
        ]
    },
    language: 'en',
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    },
    codeBlock: {
        languages: [
            // Do not render the CSS class for the plain text code blocks.
            {language: 'plaintext', label: 'Plain text', class: ''}
        ]
    },
    isReadOnly: true,
    licenseKey: ''
};