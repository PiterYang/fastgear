<template>
    <div :class="isReadOnly ? 'readonly': ''">
         <textarea name="season" id="editor" style="border:none; visibility: hidden;"></textarea>
    </div>
</template>
<script>
const CK_EDITOR_CONDIG = {
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
export default {
    name: 'FgEditor',
    props: {
        isReadOnly: {
            type: Boolean
        },
        value: {
            type: String
        }
    },
    methods: {
        
    },
    // watch: {
    //     value: {
    //         handler(val){
    //             if(val){
    //                 this.editor.setData(val)
    //             }
    //         }
    //     }
    // },
    mounted(){
        console.log(1112312)
        setTimeout(() => {
            this.ClassicEditor.create(document.querySelector('#editor'), {
                ...CK_EDITOR_CONDIG
            })
                .then(editor => {
                    this.editor = editor;
                    editor.isReadOnly = this.isReadOnly || false;
                    if(this.value){
                        editor.setData(this.value)
                    }
                    editor.model.document.on('change:data', (eve, prop, newVal, old) => {
                        this.$emit('input', editor.getData());
                    });
                })
                .catch(error => {
                    console.error(error);
                });
        });
        
    }
}
</script>
<style lang="less">
.readonly{
    .ck-editor {
    
        .ck-editor__top {
            display: none !important;
        }
    }
    .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused){
        border: none;
    }
}

</style>