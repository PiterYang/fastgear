<template>
    <div>
        <el-popover
            ref="feedback_popover"
            placement="top"
            :title="showContent ? '欢迎反馈': '反馈成功'"
            width="280"
            trigger="manual"
            v-model="visible"
            popper-class="feedback-shortcut-popover"
            :visible-arrow="false"
        >
            <i class="el-icon-close" @click="handleClose"></i>
            <div class="content" v-show="showContent">
                <p class="label">请描述您的问题</p>
                <el-input
                    type="textarea"
                    v-model="problemDesc"
                    :rows="10"
                    :class="descError? 'descError': ''"
                    @blur="handleBlur"
                    placeholder="问题、bug、建议 — 您可以在这里写下任何内容"
                ></el-input>
                <p class="label label-add">附件（可选）</p>
                <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture"
                    :limit="5"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :on-success="handleSuccess"
                    :multiple="true"
                    :on-error="handleError"
                    :on-change="handleChange"
                >
                    <div class="upload-btn">+&nbsp;&nbsp;最多上传5个，支持jpg、png、gif</div>
                    <div class="upload-error-message">{{message}}</div>
                </el-upload>
            </div>
            <div class="content" v-show="!showContent">
                <div class="img"></div>
                <p class="thank-title">感谢您将想法分享给我们，您的反馈非常重要</p>
                <p class="thank-content">您发送的内容已飞速抵达产品团队，fastgear团队成员将在1-2个工作日内通过slack或邮件联系您，请耐心等待。</p>
            </div>
            <div class="footer">
                <el-button
                    size="mini"
                    type="primary"
                    @click="handleSend"
                    :loading="loading"
                    :disabled="sendDisabled"
                    v-if="showContent"
                >发送</el-button>
                <el-button size="mini" type="primary" @click="handleClose" v-else class="close">关闭</el-button>
            </div>
        </el-popover>
        <el-tooltip
            class="item"
            effect="dark"
            content="Feedback"
            placement="top-start"
            :manual="visible"
            :value="tipShow"
            popper-class="feedback-tooltip"
        >
            <div
                v-popover:feedback_popover
                :class="['feedback-shortcut', visible ? 'arrow-down' : 'chat']"
                @click="handleClickFeedback"
            ></div>
        </el-tooltip>
    </div>
</template>
<script>
// import {addFeedback} from 'api/public';
let imageList = [];
export default {
    name: 'FgFeedback',
    data() {
        return {
            visible: false,
            fileList: [],
            problemDesc: '',
            showContent: true,
            loading: false,
            processCount: 0,
            descError: false,
            message: '',
            sendDisabled: false,
            tipShow: false
        };
    },
    props: {
        uploadUrl: {
            type: String
        },
        sendUrl: {
            type: String
        }
    },
    mounted() {
        document.body.insertBefore(this.$el, document.body.lastChild);
    },
    methods: {
        handlePreview(file) {},
        handleExceed(files, fileList) {
            this.message = '最多支持上传5个文件';
        },
        beforeUpload(file) {
            const isFileFormat =
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'image/gif';
            const isFileSize = file.size / 1024 / 1000 <= 10;
            if (!isFileFormat) {
                this.message = '附件目前仅支持jpg、png、gif格式，请更换';
                return false;
            } else {
                this.message = '';
            }
            if (!isFileSize) {
                this.message = '上传图片大小不能超过 10MB!';
                return false;
            } else {
                this.message = '';
            }
            let passed = isFileFormat && isFileSize;
            if (passed) {
                this.sendDisabled = true;
                this.processCount++;
            }
        },
        handleRemove(file, fileList) {
            if (file) {
                let realId = this.$utils.convert(file, 'response.data.file_key') || file.uid;
                this.stopLoading();
                this.removeImage(realId);
            }
        },
        removeImage(realId) {
            imageList.splice(
                imageList.findIndex(item => {
                    return item.file_key === realId;
                }),
                1
            );
        },
        handleChange() {
            setTimeout(() => {
                const ele = document.querySelector('.content');
                ele.scrollTop = ele.scrollHeight;
            });
        },
        handleSuccess(response, file, fileList) {
            // 上传成功后，再统一把返回结果的 id 保存到上传列表中，用于提交数据
            this.stopLoading();
            let convert = this.$utils.convert;
            imageList = fileList.map(item => {
                let realId = convert(item, 'response.data.file_key') || item.uid;
                return {
                    file_key: realId
                };
            });
        },
        handleSend() {
            if (['', undefined].includes(this.problemDesc)) {
                this.descError = true;
                return;
            } else {
                this.descError = false;
            }
            this.loading = true;
            fetch(this.sendUrl, {
                body: JSON.stringify({
                attachments: imageList,
                url: location.href,
                description: this.problemDesc
            }), // must match 'Content-Type' header
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
            })
            .then(response => {
                this.showContent = false;
                this.loading = false;
                this.init();
            })
        },
        init() {
            this.fileList = [];
            imageList = [];
            this.problemDesc = '';
        },
        handleClose() {
            this.visible = false;
            this.$nextTick(() => {
                this.showContent = true;
            });
        },
        handleClickFeedback() {
            this.visible = !this.visible;
            this.showContent = true;
            this.tipShow = true;
            this.$nextTick(() => {
                if (this.visible) {
                    this.tipShow = false;
                }
            });
        },
        stopLoading() {
            this.processCount--;
            if (this.processCount <= 0) {
                this.sendDisabled = false;
            }
        },
        handleError() {
            this.stopLoading();
            this.message = '上传失败';
        },
        handleBlur() {
            if (['', undefined].includes(this.problemDesc)) {
                this.descError = true;
            } else {
                this.descError = false;
            }
        }
    }
};
</script>
<style lang="less">
.feedback-shortcut-popover {
    height: 430px !important;
    padding: 0 !important;
    position: relative;
    overflow: hidden;
    right: 12px !important;
    left: auto !important;
    .upload-btn {
        width: 248px;
        height: 36px;
        text-align: center;
        line-height: 34px;
        border: 1px dashed #ccc;
        font-size: 12px;
    }
    .upload-error-message {
        color: red;
        text-align: left;
    }
    .el-popover__title {
        background: #0e191f;
        color: #fff;
        height: 40px;
        margin-bottom: 0;
        text-align: center;
        line-height: 40px;
        font-weight: 500;
    }
    .el-icon-close {
        position: absolute;
        top: 13px;
        right: 10px;
        color: #fff;
    }
    .upload-demo {
        .el-icon-close {
            color: #606266;
        }
    }
    .content {
        height: 337px;
        overflow: auto;
        padding: 0 14px;
        font-size: 12px;
        .label {
            margin: 10px 0;
            font-weight: 700;
        }
        .label-add {
            margin-top: 18px;
        }
        .el-textarea {
            font-size: 12px;
            textarea {
                padding: 5px;
            }
        }
        .descError {
            textarea {
                border-color: red;
            }
        }
        .img {
            background: url('./img/feedback/send_success.png') no-repeat;
            width: 100px;
            height: 100px;
            margin: 0 auto;
            margin-top: 17px;
            background-size: 100%;
        }
        .thank-title {
            font-weight: 700;
            text-align: center;
            font-size: 12px;
            margin: 8px 0 10px;
            line-height: 16px;
        }
        .thank-content {
            line-height: 16px;
            text-align: justify;
            font-size: 12px;
            margin: 0;
        }
        // .el-upload-list__item-name {
        //     margin-right: 20px;
        // }
    }
    .footer {
        height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: right;
        width: 100%;
        padding: 10px 14px;
        box-sizing: border-box;
        border-top: 1px solid #dcdfe6;
        .el-button {
            background: #0e191f;
            border-color: #0e191f;
        }
        .is-disabled {
            &:hover {
                background: #0e191f;
                border-color: #0e191f;
                opacity: 0.6;
            }
        }
        .close {
            background: #fff;
            border-color: #dcdfe6;
            color: #000;
        }
    }
}
.feedback-tooltip {
    background: #0e191f !important;
}
</style>
<style lang="less" scoped>
.feedback-shortcut {
    width: 36px;
    height: 36px;
    font-size: 36px;
    position: fixed;
    right: 12px;
    bottom: 12px;
    z-index: 4000;
}

.arrow-down {
    background: url('./img/feedback/feedback_downward.png') no-repeat;
    &:focus {
        outline: none;
    }
}
.chat {
    background: url('./img/feedback/feedback_normal.png') no-repeat;
    &:hover {
        background: url('./img/feedback/feedback_hover.png') no-repeat;
    }
    &:focus {
        outline: none;
    }
}
</style>