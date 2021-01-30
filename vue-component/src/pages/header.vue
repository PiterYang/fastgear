<template>
    <el-container>
        <el-header>
            <div class="fixed">
                <img src="../assets/logo.svg" alt />
                <span class="name">FG Design</span>
                <router-link to="/resource">
                    <el-button type="text" size="medium">资源</el-button>
                </router-link>
                <router-link to="/component">
                    <el-button type="text" size="medium">组件</el-button>
                </router-link>

                <router-link to="/guard">
                    <el-button type="text" size="medium">指南</el-button>
                </router-link>
            </div>
        </el-header>
        <el-container class="fg-container-app">
            <!-- <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>-->
            <router-view></router-view>
        </el-container>
        <el-footer class="fg-footer">
            <div class="footer-main">
                <div class="link">
                    <div class="title">链接</div>
                    <div class="a-wrap">
                        <a
                            href="https://github.com/PiterYang/fastgear/tree/master/vue-component"
                            target="_blank"
                        >代码仓库</a>
                    </div>
                    <div class="a-wrap">
                        <a
                            href="https://github.com/PiterYang/fastgear/tree/master/vue-component"
                            target="_blank"
                        >更新日志</a>
                    </div>
                    <div class="a-wrap">
                        <a href="https://github.com/PiterYang/fastgear/issues" target="_blank">常见问题</a>
                    </div>
                </div>
                <div class="sociate">
                    <div class="title">社区</div>
                    <div class="a-wrap">
                        <a href target="_blank">反馈建议</a>
                    </div>
                    <div class="a-wrap">
                        <a href="https://github.com/PiterYang/fastgear/issues" target="_blank">贡献指南</a>
                    </div>
                    <div class="a-wrap">
                        <a href target="_blank">掘金论坛</a>
                    </div>
                    <div class="device">组件设计交互的解释权归fastgear团队所有</div>
                </div>
                <div class="contact">
                    <el-popover
                        placement="top"
                        popper-class="support-pay"
                        width="190"
                        trigger="click"
                    >
                        <p style="text-align: center">开源项目需要您的支持</p>
                        <img class="pay" src="../assets/Wechat_pay.jpeg" alt />
                        <img class="icon-fg-footer" slot="reference" src="../assets/wechat.svg" alt />
                    </el-popover>
                    <el-popover
                        placement="top"
                        popper-class="support-pay"
                        width="190"
                        trigger="click"
                    >
                        <p style="text-align: center">开源项目需要您的支持</p>
                        <img class="pay" src="../assets/ali_pay.jpeg" alt />
                        <img class="icon-fg-footer" slot="reference" src="../assets/pay.svg" alt />
                    </el-popover>
                    <a
                        href="https://github.com/PiterYang/fastgear/tree/master/vue-component"
                        target="_blank"
                    >
                        <img class="icon-fg-footer" src="../assets/github.svg" alt />
                    </a>
                </div>
            </div>
        </el-footer>
    </el-container>
</template>
<style lang="less" scoped>
.el-header {
    height: 80px !important;
    line-height: 80px !important;
    position: fixed;
    padding: 0 !important;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1200;
    background: #fff;
    .fixed {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        border-bottom: solid 1px #e6e6e6;
        height: 80px;
        .name {
            float: left;
            font-size: 20px;
            color: #1989fa;
            padding-left: 10px;
        }
        img {
            width: 50px;
            height: 50px;
            margin-top: 15px;
            float: left;
        }
        a {
            float: right;
            margin-left: 40px;
            .el-button {
                font-size: 16px;
                padding: 0 30px;
            }
        }
        .router-link-active {
            border-bottom: 2px solid #1989fa;

            // .el-button {
            //     background: #ecf5ff;
            //     border-color: #b3d8ff;
            // }
        }
    }
}
.fg-container-app {
    width: 1200px;
    margin: 80px auto 0;
}
.fg-footer {
    background-color: #f7fbfd;
    width: 100%;
    padding: 40px 150px;
    box-sizing: border-box;
    height: 340px !important;
    .footer-main {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        .link {
            flex: 1;
        }
        .sociate {
            flex: 4;
        }
        .contact {
            flex: 1;
        }
        .sociate {
            .device {
                text-align: center;
                margin-top: 140px;
                font-size: 12px;
                color: #60606d;
            }
        }
        .contact {
            .pay {
                width: 180px;
            }
            .icon-fg-footer {
                margin-right: 20px;
            }
        }
        .title {
            font-size: 16;
            font-weight: 500;
            margin-bottom: 9px;
        }
        .a-wrap {
            a {
                text-decoration: none;
                color: #333;
                line-height: 30px;
            }
        }
    }
}
</style>
<style lang="less">
.support-pay {
    .pay {
        width: 187px;
    }
}
</style>