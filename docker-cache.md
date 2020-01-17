# 利用docker缓存提高前端持续集成速度实践

> Docker 构建是分层的，一条指令一层，在没有带 `--no-cache=true` 的指令的情况下如果某一层没有改动，docker 就不会重新构建这一层，而是会使用缓存。所以我们可以利用这一点来使得 install 步骤在依赖没有变化时直接使用缓存。

## 对基于 antd-pro 的项目 ci 进行优化

思路是将前端项目的 install build等步骤放到 docker-build 中进行。install 之前的命令要尽量保证其可以用缓存，install 前通过移动 package.json 的方式来达到监测是否需要进行重新下载依赖。

dockerfile 内容：

```
FROM node:10.0.0-alpine
ADD package.json /cache/
ADD yarn.lock /cache/
RUN npm install -g yarn
RUN chmod 777 /usr/local/bin/yarn
WORKDIR /cache
RUN yarn install --network-timeout 1000000
COPY . /cache
RUN yarn build


FROM frontbase:0.5.0
COPY --from=0 /cache/dist /usr/share/nginx/html
RUN echo "Asia/shanghai" > /etc/timezone;
ADD ./docker/default.conf /etc/nginx/conf.d/
COPY ./docker/enterpoint.sh /usr/share/nginx/html
RUN chmod 777 /usr/share/nginx/html/enterpoint.sh
ENTRYPOINT ["/usr/share/nginx/html/enterpoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

```

可以看到 install 之前如果 package.json 或者 yarn.lock 发生改变会影响后续的步骤，在 install 时就不会使用缓存

dockerfile 中使用的两段基础镜像，注意在第二段中，要使用第一段的内容时需要加 `--from` 参数

ci的结果，从第二次开始如下：

```
Step 1/19 : FROM node:10.0.0-alpine
 ---> 3036d4c4fcea
Step 2/19 : RUN node -v
 ---> Using cache
 ---> 12198fa20717
Step 3/19 : ADD package.json /cache/
 ---> Using cache
 ---> ef6306905aa5
Step 4/19 : ADD yarn.lock /cache/
 ---> Using cache
 ---> 8fa7ba6c8aed
Step 5/19 : RUN npm config set unsafe-perm true
 ---> Using cache
 ---> cfb37bd5bdfe
Step 6/19 : RUN npm install -g yarn
 ---> Using cache
 ---> 0b6c0bf3b97d
Step 7/19 : RUN cd /cache && export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
 ---> Using cache
 ---> 8d66f97ccf9e
Step 8/19 : RUN chmod 777 /usr/local/bin/yarn && cd /cache && yarn install --network-timeout 1000000
 ---> Using cache
 ---> b8aa36b7c167
Step 9/19 : COPY . /cache
 ---> fade3d1e0279
Step 10/19 : RUN cd /cache && yarn build
 ---> Running in 143daebd8473
yarn run v1.21.1
```

可以看到 install 的部分直接使用了 cache


## 对 lerna 方式构建的项目 ci 进行优化