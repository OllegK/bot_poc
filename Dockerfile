FROM node:11

ENV DEBIAN_FRONTEND noninteractive
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn

RUN apt-get update && apt-get install -y apt-utils debconf-utils dialog iptables 
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections 
RUN echo "resolvconf resolvconf/linkify-resolvconf boolean false" | debconf-set-selections 
RUN apt-get update && apt-get install -y resolvconf

RUN apt-get update && apt-get install -y ifupdown \
  && apt-get install -y dirmngr apt-transport-https \
  && apt-key adv --keyserver keyserver.ubuntu.com --recv-key FDC247B7 \
  && sh -c "echo 'deb https://repo.windscribe.com/debian stretch main' > /etc/apt/sources.list.d/windscribe-repo.list" 

RUN apt-get update && apt-get install -y windscribe-cli

RUN apt-get update && apt-get install -y wget --no-install-recommends \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge --auto-remove -y curl \
  && rm -rf /src/*.deb

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

WORKDIR /usr/src/app

COPY ./app/package*.json ./

RUN npm install

COPY . .
 
ENTRYPOINT ["dumb-init", "--"]
# CMD ["node", "./app/src/app.js"]
# CMD ["bash"]
CMD ["bash", "-c", "./startup.sh && bash"]