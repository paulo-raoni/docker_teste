FROM  node:8.12.0

WORKDIR /usr/src/app

ADD . .

ENV JAVA_HOME=/usr/src/app/jre
ENV PATH $PATH:/usr/src/app/jre
ENV SONAR_RUNNER_HOME=/usr/src/app/sonar-scanner
ENV PATH $PATH:${SONAR_RUNNER_HOME}/bin


ARG STAGE

RUN if [ "$STAGE" = "Desenvolvimento" ] ; then npm install;npm audit; npm test; sonar-scanner ; rm -r /usr/src/app/jre ;rm -r /usr/src/app/sonar-scanner ; else npm install --production;  fi

EXPOSE 8081
CMD ["node", "app.js"]
